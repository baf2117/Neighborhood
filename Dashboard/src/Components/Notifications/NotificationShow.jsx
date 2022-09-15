import { useQuery, Loading, Error } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const InfoInput = ({ label, type, value, col }) => {
    return (
        <div class={col ?? "col-4"}>
            <div class="row">
                <div class="col-12">
                    <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', width: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                </div>
            </div>
            <div class="row" style={{ marginTop: '-0.8em' }} >
                <div class="col-12">
                    <input type={type} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', width: '100%', fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} value={value} />
                </div>
            </div>
        </div>
    );
}

const NotificationsShow = (props) => {

    var isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'notifications',
        payload: { id: props.id }
    });

    if (loading) return <Loading loadingPrimary="Cargando" loadingSecondary="Página está cargando. Espere un segundo" />;
    if (error) return <Error />;
    if (!data) return null;


    return (
        <div style={{ height: '100%', width: '100%', backgroundColor: 'white', border: '2px solid #EFEFEF', borderRadius: '7px', }} >
            {!isSmall ? (
                <div class="container" style={{ marginTop: '1.5em' }}>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>Descripción</label>
                            </div>
                        </div>
                        <div class="row" style={{ marginTop: '-0.5em' }} >
                            <div class="col-12">
                                <textarea name='description' style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: '100%', fontSize: '0.85em', height: '6em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} readOnly={true} defaultValue={data.description} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="container" style={{ marginTop: '1.5em' }}>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>Descripción</label>
                            </div>
                        </div>
                        <div class="row" style={{ marginTop: '-0.5em' }} >
                            <div class="col-12">
                                <textarea name='description' style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: '100%', fontSize: '0.85em', height: '6em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} readOnly={true} defaultValue={data.description} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationsShow