# River Tech FE Interview

## Instructions

### Requirements

Create a mini casino website which contains;

* Do not use Angular's `async` pipe
* Home page
  	* Containing a list of all `trending` games
* Side menu
  	* Links to `home` and `games`
* Games page
  	* List of all games
  	* Search
    	* When the user types inside the search field the games list should update in real time with the results
    	* There should be a 500ms delay between the user typing and updating of results
    	* The URL should contain the `search term` as a query param
    * Drop down filter by provider
      	* Dropdown should be a multi-select, user must be able to select multiple providers
      	* User should have an option to clear all selected providers
      	* Clicking an already selected provider deselects it
      	* When selecting/deselecting a provider from the list it should be reflected inside the url
      	* Provider list should be updated depending on the searched results only
    * Search and providers filtering should work in conjunction e.g. `http://localhost:4200/games?searchTerm=book&provider=Kalamba%20Games`
        * Refreshing should keep the user's filter / search 
        * Clearing the search should not clear the game provider filter and vice versa
* Game page
  	* Contains the thumb and a `Play for Fun` button which redirects to the game by using the `startUrl`
  	* Use the `Game.slug` for the `URL` param
* Last Played Games
  	* At the bottom for all pages, have a section called `Last Played`
  	* Game is considered as `Last Played` when the user has navigated to the Game Page
  	* Only Show the 5 most recent games
  	* Should not contain duplicate games
  	* Should be ordered by last played first
  	* Should be persisted even after the user refreshes the browser
* Linting
  * Fix build issue 
  * Project should pass all lint rules

### Technical Details

* The solution should be built using Angular, SCSS and TypeScript.
* Use Redux; The scaffolding provided already has `ngxs` installed, you may use other libraries if you want.
* Use the data provided inside the scaffolding `game.mock-data.json` (There should be no alterations to the data provided)
* You may use any libraries or plug-ins you wish to fulfill the requirements.

### Rating

* You may create the solution however you want, these are key things we will look for;
  * All requirements are met (non-advanced)
  * Best practices
  * Code structure, readability and reusability
  * Error handling
  * Performance considerations
  * RxJS operators usage
  * Redux State
  * Modelling data with TypeScript
  * Polished Design
  * SCSS usage

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.

### Additional help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
