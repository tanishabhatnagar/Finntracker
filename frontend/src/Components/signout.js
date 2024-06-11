// Signout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';

function Signout() {
    const handleSignout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button onClick={handleSignout}>Sign Out</button>
    );
}

export default Signout;
