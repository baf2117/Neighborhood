import React, { FC, PropsWithChildren, ReactNode } from "react"
import { Box } from '@material-ui/core';

interface CenterBoxProps extends PropsWithChildren<any> {
    verticalAlign?: 'center' | 'initial',
    horizontalAlign?: 'center' | 'initial',
    style?: React.CSSProperties;
}

const CenterBox: FC<CenterBoxProps> = ({ verticalAlign = "center", horizontalAlign = "center", style, children }) => {
    return (
        <Box
            display="flex"
            justifyContent={horizontalAlign}
            alignItems={verticalAlign}
            height="100%"
            textAlign={horizontalAlign}
            style={style}
        >
            {children}
        </Box>
    )
}

export default CenterBox;