import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles"

const CodeSpan = styled('span')({
    color: 'teal'
})

const OuterHeadings = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
})

const InnerHeadings = styled('div')({
    height: '40px',
    lineHeight: '40px',
    fontSize: '35px',
    textTransformation: 'uppercase',
    overflow: 'hidden'
})

const InnerHeadingsSpan = styled('span')({
    position: "relative",
    animation: "animation 10s ease infinite",
    "@keyframes animation": {
        "0%,\n  100%": { top: "0" },
        "20%": { top: "0" },
        "25%": { top: "-40px" },
        "45%": { top: "-40px" },
        "50%": { top: "-80px" },
        "70%": { top: "-80px" },
        "75%": { top: "-120px" },
        "95%": { top: "-120px" }
    }
})

const Introduction = () => {
    return (
        <>
            <Typography variant="h2">Hi, I'm
                <CodeSpan> Isaac</CodeSpan>
            </Typography>
            <Typography variant="h3">Welcome to my site... Please take a look around!</Typography>
            <Divider />
            <Typography variant="h4" >
                <CodeSpan>IsaacYocum@dev</CodeSpan>
                <span>:~{'$'} pwd</span>
            </Typography>
            <Typography variant="h4">/home/myProtfolio</Typography>
            <Typography variant="h4" >
                <CodeSpan>IsaacYocum@dev</CodeSpan>
                <span>:~{'$'} whoami</span>
            </Typography>
            <OuterHeadings>
                <InnerHeadings>
                    <InnerHeadingsSpan>
                        Full-Stack Developer <br />
                        UI/UX Designer <br />
                        Software Engineer <br />
                        Perpetual Learner <br />
                    </InnerHeadingsSpan>
                </InnerHeadings>
            </OuterHeadings>
        </>
    )
}

export default Introduction;