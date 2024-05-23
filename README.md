# 🏠🎩 dahlia-forml-test

Use YAML to create a Form.io version of the DAHLIA application form.


## Install

```shell
npm install
npm run dev
```


## Usage

Open the `localhost` address listed in the shell.  Then edit the [`form.yaml`](form.yaml) file and save it to see the rendered form update immediately.


## Things to do and see

Vite converts the imported yaml file to a JS object, which is then passed to [`processComponents()`](src/form/processComponent.js).  That function walks the tree of components and "inflates" each one, adding required keys or converting the data to the format that Form.io expects.  It also handles some special components that don't exist in Form.io, like [`address`](src/form/address.js), which is a reusable component that renders the fields for a street address, or [`panelGroup`](src/form/panelGroup.js), which organizes panels into higher-level named groups.  Converting data in the form schema into different objects that Form.io supports can be a powerful approach for simplifying form generation and code reuse.

The box at the top of the page is rendered by [`Breadcrumbs`](src/components/Breadcrumbs.jsx), a React component that updates when the form page changes.  Its steps are defined by the `panelGroup` components in the `form.yaml` file.

Clicking Next on the Contact page shows a spinner while the entered address is verified.  This is handled via a [`beforeHook` function](src/form/hooks.js), which applies special handling for that particular page.

The (incomplete) summary of what the user entered on the final review page is actually implemented as a [React component](src/components/ReviewSummary.jsx).  It's rendered into the form markup via a portal when the user navigates to that page in the Form.io wizard.

The [`submission.yaml`](submission.yaml) file is passed into the form as existing data, as if it was a previously saved application from the user.

The [`listing.json`](listing.json) file represents the data for a DAHLIA rental listing.  Removing the NRHP preference from the `Listing_Lottery_Preferences` array and saving the file will also remove the *NRHP* panel, since we want the form flow to depend on the details of the listing.

The Form.io nav header is still being rendered below the `Breadcrumbs` element, but is made nearly transparent to make it less distracting (it would be hidden entirely in a real version of this form).  Hover over it to see it better, and click a page name to jump to that part of the form.

This is not a complete version of the DAHLIA application form, but hopefully demonstrates enough of the more complicated areas.
