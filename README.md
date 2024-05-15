# 🏠🎩 dahlia-forml-test

Use YAML to create a Form.io version of the DAHLIA application form.


## Install

```shell
npm install
npm run dev
```


## Usage

Open the `localhost` address listed in the shell.  Then edit the [`form.yaml`](form.yaml) file and save it to see the rendered form update immediately.

The [`listing.json`](listing.json) file represents the data for a DAHLIA rental listing.  Removing the NRHP preference from the `Listing_Lottery_Preferences` array and saving the file will also remove the *NRHP* panel, since we want the form flow to depend on the details of the listing.

The box at the top of the page is rendered by [`Breadcrumbs`](src/components/Breadcrumbs.jsx), a React component that updates when the form page changes.  Its steps are defined by the `panelGroup` components in the `form.yaml` file.

The Form.io nav header is still being rendered below the `Breadcrumbs` element, but is made nearly transparent to make it less distracting (it would be hidden entirely in a real version of this form).  Hover over it to see it better, and click a page name to jump to that part of the form.

This is not a complete version of the DAHLIA application form, but hopefully demonstrates enough of the more complicated areas.
