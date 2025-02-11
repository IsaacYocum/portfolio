import { Divider, Typography } from "@mui/material";

const styles = {
  code: {
    color: 'teal'
  }
}

const Introduction = () => {
    return (
        <>
            <Typography variant="h2">Hi, I'm
                <span style={styles.code}> Isaac</span>
            </Typography>
            <Typography variant="h3">Welcome to my site... Please take a look around!</Typography>
            <Divider />
            <Typography variant="h4" >
                <span style={styles.code}>IsaacYocum@dev</span>
                <span>:~{'$'} pwd</span>
            </Typography>
            <Typography variant="h4">/home/myProtfolio</Typography>
            <Typography variant="h4" >
                <span style={styles.code}>IsaacYocum@dev</span>
                <span>:~{'$'} whoami</span>
            </Typography>
        </>
    )
}

export default Introduction;