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

const VisitsShow = (props) => {

    var isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { data, loading, error } = useQuery({
        type: 'getOne',
        resource: 'visits',
        payload: { id: props.id }
    });

    if (loading) return <Loading loadingPrimary="Cargando" loadingSecondary="Página está cargando. Espere un segundo" />;
    if (error) return <Error />;
    if (!data) return null;


    return (
        <div style={{ height: '100%', width: '100%', backgroundColor: 'white', border: '2px solid #EFEFEF', borderRadius: '7px', }} >
            {!isSmall ? (
                <div class="container" style={{ marginTop: '1.5em' }}>
                    <div class="row">
                        <InfoInput type="text" value={data.name} label="Nombre" />
                        <InfoInput type="text" value={data.phone} label="Teléfono" />
                        <InfoInput type="text" value={data.dpi} label="DPI" />
                    </div>
                    <div class="row">
                        <InfoInput type="text" value={data.date} label="Fecha" />
                    </div>
                </div>
            ) : (
                <div class="container" style={{ marginTop: '1.5em' }}>
                    <div class="row">
                        <InfoInput type="text" col="col-12" value={data.name} label="Nombre" />
                    </div>
                    <div class="row">
                        <InfoInput type="text" col="col-12" value={data.phone} label="Teléfono" />
                    </div>
                    <div class="row">
                        <InfoInput type="text" col="col-12" value={data.dpi} label="DPI" />
                    </div>
                    <div class="row">
                        <InfoInput type="text" col="col-12" value={data.date} label="Fecha" />
                    </div>
                </div>
            )}
        </div>
    );
}


export default VisitsShow