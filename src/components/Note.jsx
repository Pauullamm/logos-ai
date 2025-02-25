import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { StickyNote, FilePen } from 'lucide-react';
import * as CircularJSON from 'circular-json';

// Style for the modal so it appears at the bottom of the screen
const modalStyle = {
    position: 'fixed',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 600,
    bgcolor: '#F7EED3',
    border: '1px solid #ccc',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
};

export default function Note({ bookInfo, chapterId, verseId }) {
    const [noteText, setNoteText] = useState('');
    const [open, setOpen] = useState(false);
    
    const getNotesData = () => window.electronStore.get('notesData');
    // When the user clicks the sticky note button, load any existing note (if available)
    const handleOpen = async () => {
        const notesData = await getNotesData();
        try {
            const book = notesData[bookInfo];
            if (book && book.chapterData && book.chapterData[chapterId]) {
                const verses = book.chapterData[chapterId];
                const existingVerse = verses.find((v) => v.verseNum === verseId);
                if (existingVerse && existingVerse.note) {
                    setNoteText(existingVerse.note);
                } else {
                    setNoteText('');
                }
            } else {
                setNoteText('');
            }
        } catch (error) {
            console.error('Error retrieving note data:', error.message);
            setNoteText('');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Save the note in the notesData structure
    const saveNote = async () => {
        const notesData = await getNotesData();
        try {
            // Ensure that the book entry exists
            if (!notesData[bookInfo]) {
                notesData[bookInfo] = { chapterData: {} };
            }
            // Ensure that the chapter entry exists
            if (!notesData[bookInfo].chapterData[chapterId]) {
                notesData[bookInfo].chapterData[chapterId] = [];
            }
            const verses = notesData[bookInfo].chapterData[chapterId];
            const existingIndex = verses.findIndex((v) => v.verseNum === verseId);

            if (existingIndex !== -1) {
                // Update the existing note
                verses[existingIndex].note = noteText;
            } else {
                // Add a new note entry for the verse
                verses.push({ verseNum: verseId, note: noteText });
            }
            window.electronStore.set('notesData', notesData);
            setOpen(false);
        } catch (error) {
            console.error('Error saving note:', error.message);
        }
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Add note">
                <button
                    onClick={handleOpen}
                    className="px-3 py-1 text-white bg-[#F7DCB9] rounded hover:bg-[#DEAC80] cursor-pointer opacity-80 text-black"
                >
                    <StickyNote size={16} color="#000000" />
                </button>
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <TextField
                        id="modal-note-text"
                        label="Add note"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        sx={{ backgroundColor: '#FFF8E8' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={saveNote}
                            variant="contained"
                            startIcon={<FilePen size={16} />}
                            sx={{ backgroundColor: '#A3C9AA', color: '#000000' }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
