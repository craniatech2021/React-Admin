import * as React from 'react';
import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import lodashGet from 'lodash/get';
// @ts-ignore
import inflection from 'inflection';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import { getResources, useTranslate, Translate, ReduxState } from 'ra-core';

import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';

export const MENU_WIDTH = 240;
export const CLOSED_MENU_WIDTH = 55;

const useStyles = makeStyles(
    theme => ({
        main: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: '0.5em',
            [theme.breakpoints.only('xs')]: {
                marginTop: 0,
            },
            [theme.breakpoints.up('md')]: {
                marginTop: '1.5em',
            },
        },
        open: {
            width: lodashGet(theme, 'menu.width', MENU_WIDTH),
        },
        closed: {
            width: lodashGet(theme, 'menu.closedWidth', CLOSED_MENU_WIDTH),
        },
    }),
    { name: 'RaMenu' }
);

const translatedResourceName = (resource: any, translate: Translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                      smart_count: 2,
                      _: resource.options.label,
                  })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

const Menu: FC<MenuProps> = props => {
    const {
        classes: classesOverride,
        className,
        dense,
        hasDashboard,
        onMenuClick,
        logout,
        ...rest
    } = props;
    const translate = useTranslate();
    const classes = useStyles(props);
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources, shallowEqual) as Array<any>;

    return (
        <div
            className={classnames(
                classes.main,
                {
                    [classes.open]: open,
                    [classes.closed]: !open,
                },
                className
            )}
            {...rest}
        >
            {hasDashboard && (
                <DashboardMenuItem
                    onClick={onMenuClick}
                    dense={dense}
                    sidebarIsOpen={open}
                />
            )}
            {resources
                .filter(r => r.hasList)
                .map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={{
                            pathname: `/${resource.name}`,
                            state: { _scrollToTop: true },
                        }}
                        primaryText={translatedResourceName(
                            resource,
                            translate
                        )}
                        leftIcon={
                            resource.icon ? <resource.icon /> : <DefaultIcon />
                        }
                        onClick={onMenuClick}
                        dense={dense}
                        sidebarIsOpen={open}
                    />
                ))}
            {isXSmall && logout}
        </div>
    );
};

export interface MenuProps {
    classes?: object;
    className?: string;
    dense?: boolean;
    hasDashboard?: boolean;
    logout?: ReactNode;
    onMenuClick?: () => void;
}

Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
};

Menu.defaultProps = {
    onMenuClick: () => null,
};

export default Menu;
