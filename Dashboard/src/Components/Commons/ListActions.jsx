import { TopToolbar } from 'react-admin';
import { useListContext, ExportButton, sanitizeListRestProps, } from 'react-admin';
import Tooltip from '@material-ui/core/Tooltip';
import add from './Icons/Botón-05.svg';
//import down from './Icons/Botón-09.svg';
import down from './Icons/Descargar CSV-21.svg';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({

});


const Create = ({ resource, basePath, classes }) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  var smallstyle = isSmall ? '0.5em' : '0em';
  var width = isSmall ? '7rem' : '7rem';
  var height = isSmall ? '2.5rem' : '2.5rem';
  
  if (resource === 'clearing')
    return (<div></div>)
  else
    return (
      <IconButton href={'#' + basePath + '/create'} aria-label="delete" className={classes.margin} size="small">
        <img src={add} alt="logo" style={{ maxWidth: width, maxHeight: height, marginTop: smallstyle, marginBottom:"0%" }} />
      </IconButton>)
}

const ListActions = (props) => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;

  const {
    currentSort,
    resource,
    filterValues,
    basePath,
    total,
  } = useListContext();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  var width = isSmall ? '12em' : '7rem';
  var height = isSmall ? '4em' : '2.5rem';

  const InfoInput = ({ label, type, value, col, name, readOnly, width }) => {
    var minwidth = width ?? '80%';
    return (
        <div class={col ? col : "col-6"}>
            <div class="row">
                <div class="col-12">
                    <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                </div>
            </div>
            <div class="row" style={{ marginTop: '-0.5em' }} >
                <div class="col-12">
                    <input type={type} name={name} readOnly style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} defaultValue={value} />
                </div>
            </div>
        </div>
    );
}

  const classes = useStyles();

  return (
    <TopToolbar  {...sanitizeListRestProps(rest)}>
      
      {!isSmall ? (
      <Tooltip title="Exportar" style={{ fontFamily: 'Gothic' }}>
        <ExportButton
          disabled={total === 0}
          resource={resource}
          sort={currentSort}
          filterValues={filterValues}
          maxResults={maxResults}
          icon={<img src={down} alt="logo" style={{ maxWidth: '9rem', maxHeight: '2.5rem' }} />}
          label=""
        />
      </Tooltip>
      ) : (
        <InfoInput type="hidden" />
      )}
      <Tooltip title="Crear" >
        <Create resource={resource} classes={classes} basePath={basePath} />
      </Tooltip>
    </TopToolbar>
  );
};

export default ListActions;