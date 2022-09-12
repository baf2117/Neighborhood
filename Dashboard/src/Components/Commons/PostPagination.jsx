import { Button, Toolbar } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {useListContext} from 'react-admin';

const PostPagination = () => {
    const { page, perPage, total, setPage } = useListContext();
    const nbPages = Math.ceil(total / perPage) || 1;
    return (
        nbPages > 1 &&
        <Toolbar>
            {page > 1 &&
                <Button style={{ fontFamily: 'Gothic' }} color="#2A3353" key="prev" onClick={() => setPage(page - 1)}>
                    <ChevronLeft />
                        Anterior
                    </Button>
            }
            {page !== nbPages &&
                <Button color='#2A3353' style={{ fontFamily: 'Gothic' }} key="next" onClick={() => setPage(page + 1)}>
                    Siguiente
                        <ChevronRight />
                </Button>
            }
        </Toolbar>
    );
}

export default PostPagination;