import * as React from 'react';
import {
    isValidElement,
    Children,
    cloneElement,
    useCallback,
    FC,
    ReactElement,
} from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    Table,
    TableProps,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

import classnames from 'classnames';

import {
    sanitizeListRestProps,
    useListContext,
    useVersion,
    DatagridHeaderCell,
    DatagridLoading,
    DatagridBody,
    useDatagridStyles
} from 'react-admin';

const Datagrid = props => {
    const classes = useDatagridStyles(props);
    const {
        body = <DatagridBody />,
        children,
        classes: classesOverride,
        className,
        expand,
        hasBulkActions = false,
        hover,
        isRowSelectable,
        rowClick,
        rowStyle,
        size = 'small',
        ...rest
    } = props;

    const {
        basePath,
        currentSort,
        data,
        ids,
        loaded,
        onSelect,
        onToggleItem,
        resource,
        selectedIds,
        setSort,
        total,
    } = useListContext(props);
    const version = useVersion();

    const updateSort = useCallback(
        event => {
            event.stopPropagation();
            const newField = event.currentTarget.dataset.field;
            const newOrder =
                currentSort.field === newField
                    ? currentSort.order === 'ASC'
                        ? 'DESC'
                        : 'ASC'
                    : event.currentTarget.dataset.order;

            setSort(newField, newOrder);
        },
        [currentSort.field, currentSort.order, setSort]
    );

    const handleSelectAll = useCallback(
        event => {
            if (event.target.checked) {
                const all = ids.concat(
                    selectedIds.filter(id => !ids.includes(id))
                );
                onSelect(
                    isRowSelectable
                        ? all.filter(id => isRowSelectable(data[id]))
                        : all
                );
            } else {
                onSelect([]);
            }
        },
        [data, ids, onSelect, isRowSelectable, selectedIds]
    );

    if (loaded === false) {
        return (
            <DatagridLoading
                classes={classes}
                className={className}
                expand={expand}
                hasBulkActions={hasBulkActions}
                nbChildren={React.Children.count(children)}
                size={size}
            />
        );
    }

    if (loaded && (ids.length === 0 || total === 0)) {
        return null;
    }

    const all = isRowSelectable
        ? ids.filter(id => isRowSelectable(data[id]))
        : ids;

    return (
        <Table
            className={classnames(classes.table, className)}
            size={size}
            {...sanitizeListRestProps(rest)}
        >
            <TableHead className={classes.thead}>
                <TableRow
                    className={classnames(classes.row, classes.headerRow)}
                >
                    {expand && (
                        <TableCell
                            padding="none"
                            className={classnames(
                                classes.headerCell,
                                classes.expandHeader
                            )}
                        />
                    )}
                    {hasBulkActions && (
                        <TableCell
                            padding="checkbox"
                            className={classes.headerCell}
                        >
                            <Checkbox
                                className="select-all"
                                color="primary"
                                checked={
                                    selectedIds.length > 0 &&
                                    all.length > 0 &&
                                    all.every(id => selectedIds.includes(id))
                                }
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                    )}
                    {Children.map(children, (field, index) =>
                        isValidElement(field) ? (
                            <DatagridHeaderCell
                                className={classes.headerCell}
                                currentSort={currentSort}
                                field={field}
                                isSorting={
                                    currentSort.field ===
                                    (field.props.sortBy ||field.props.source)
                                }
                                key={field.props.source || index}
                                resource={resource}
                                updateSort={updateSort}
                                style={{fontFamily:'Gothic', fontWeight:'bold', textAlign:'center'}}
                            />
                        ) : null
                    )}
                </TableRow>
            </TableHead>
            {cloneElement(
                body,
                {
                    basePath,
                    className: classes.tbody,
                    classes,
                    expand,
                    rowClick,
                    data,
                    hasBulkActions,
                    hover,
                    ids,
                    onToggleItem,
                    resource,
                    rowStyle,
                    selectedIds,
                    isRowSelectable,
                    version,
                },
                children
            )}
        </Table>
    );
};

Datagrid.propTypes = {
    basePath: PropTypes.string,
    body: PropTypes.element,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    data: PropTypes.object,
    // @ts-ignore
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    setSort: PropTypes.func,
    total: PropTypes.number,
    version: PropTypes.number,
    isRowSelectable: PropTypes.func,
};

export default Datagrid;

