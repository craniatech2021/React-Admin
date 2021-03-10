import * as React from 'react';
import { FC, AnchorHTMLAttributes, memo } from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';

import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';
import { Link } from '@material-ui/core';

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const EmailField: FC<EmailFieldProps> = memo<EmailFieldProps>(
    ({ className, source, record = {}, emptyText, ...rest }) => {
        const value = get(record, source);

        if (value == null) {
            return emptyText ? (
                <Typography
                    component="span"
                    variant="body2"
                    className={className}
                    {...sanitizeFieldRestProps(rest)}
                >
                    {emptyText}
                </Typography>
            ) : null;
        }

        return (
            <Link
                className={className}
                href={`mailto:${value}`}
                onClick={stopPropagation}
                {...sanitizeFieldRestProps(rest)}
            >
                {value}
            </Link>
        );
    }
);

EmailField.defaultProps = {
    addLabel: true,
};

EmailField.propTypes = fieldPropTypes;

export interface EmailFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {}

export default EmailField;
