import React from 'react'
import NavBar from './NavBar'
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from 'react';


const Home = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <div>
                <NavBar path={{ login: false, signup: false }} />
                <>
                    <Backdrop
                        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="secondary" />
                    </Backdrop>

                </>
            </div>
            <div className="login-container"></div>
        </div>
    )
}

export default Home