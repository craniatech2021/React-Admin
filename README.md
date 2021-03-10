# React-Admin

A frontend Framework for building data-driven applications running in the browser on top of REST/GraphQL APIs, using ES6, [React](https://facebook.github.io/react/) and [Material Design](https://material.io/).

## Features

* Adapts to any backend (REST, GraphQL, SOAP, etc.)
* Powered by [material-ui](https://material-ui.com/), [redux](https://redux.js.org/), [react-final-form](https://final-form.org/react), [react-router](https://reacttraining.com/react-router/) and a few more
* Super-fast UI thanks to optimistic rendering (renders before the server returns)
* Undo updates and deletes for a few seconds
* Relationships (many to one, one to many)
* Data Validation
* Internationalization (i18n)
* Themeable, Highly customizable interface
* Supports any authentication provider (REST API, OAuth, Basic Auth, ...)
* Full-featured datagrid (sort, pagination, filters)
* Large library of components for various data types: boolean, number, rich text, etc.
* Conditional formatting
* Filter-as-you-type
* Supports any form layout (simple, tabbed, etc.)
* Custom actions
* WYSIWYG editor
* Customize dashboard, menu, layout
* Super easy to extend and override (it's just React components)
* Can be included in another React app

## Installation

React-admin is available from npm. You can install it (and its required dependencies)
using:

```sh
npm install react-admin
#or
yarn add react-admin
```

## At a Glance

```jsx
// in app.js
import * as React from "react";
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import { PostList, PostEdit, PostCreate, PostIcon } from './posts';

render(
    <Admin dataProvider={restProvider('http://localhost:3000')}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    </Admin>,
    document.getElementById('root')
);
```

The `<Resource>` component is a configuration component that allows to define sub components for each of the admin view: `list`, `edit`, and `create`. These components use Material UI and custom components from react-admin:

```jsx
// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/core/svg-icons/action/book';
export const PostIcon = BookIcon;

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
```

## Batteries Included But Removable

React-admin is designed as a library of loosely coupled React components built on top of [material-ui](https://material-ui.com/), in addition to custom react hooks exposing reusable controller logic. It is very easy to replace one part of react-admin with your own, e.g. to use a custom datagrid, GraphQL instead of REST, or Bootstrap instead of Material Design.

### Setup

Clone this repository and run `make install` to grab the dependencies, then `make build` to compile the sources from TypeScript to JS.