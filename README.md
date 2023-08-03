# Shipper Data Dashboard

An operational business review dashboard built for a logistics start-up that seeks to modernise freight operations for third-party logistics (3PL) companies.

The goal of this dashboard is to enable 3PLs to conduct business reviews with their shippers, demonstrate performance, and get more trips. This dashboard saves 3PLs weeks of effort to prepare for such reviews by automatically generating data and charts needed for the business reviews.

This game was developed as part of my coursework for my Software Engineering Immersive Bootcamp in General Assembly.

# Screenshots

Homepage
<img src="./src/assets/ReadmeScreen1.png">
Shipper Overview - View and manage all shippers in one page
<img src="./src/assets/ReadmeScreen2.png">
<img src="./src/assets/ReadmeScreen3.png">

3PL users can use shipper-specific data dashboard to run business reviews with their Shippers
###Features:

- Charts showing key business metrics with 7-day data lookback
- Data table: search, sort, date filters
  <img src="./src/assets/ReadmeScreen4.png">
  <img src="./src/assets/ReadmeScreen5.png">
  <img src="./src/assets/ReadmeScreen6.png">

# Technologies Used

- JavaScript
- Front-end library: React.js
- React component library: Mantine
- Charting library: Chart.js
- Database: Airtable

# Demo site

- Todo: Add deployment URL

# Next Steps

- More charts
- Sort by date

# Credits and references

- [Client Demo site][5]
- [Navbar reference][6] - Reference for NavBar
- [Mantine Datatable][7] - Reference for Mantine Datatable
- [Airtable URL encoder][8] - Reference for airtable endpoint

  [5]: https://dashboard.shipamiga.com/dashboard/recja2ANzmll7wqR5
  [6]: https://ui.mantine.dev/category/navbars#double-navbar
  [7]: https://icflorescu.github.io/mantine-datatable
  [8]: https://codepen.io/airtable/full/MeXqOg?baseId=appPYAMvKJeeoDs8Y&tableId=tblghPYVFfkEZRIOE

# Changelog

## 31 Jul 2023

1. Create readme
2. Basic website layout using mantine
3. Build Shipper and business review pages
4. Add routes
5. Add shipper-specific routes
6. Set up trips data in airtable
7. Fetch trips data of shipper and display in shipper biz dashboard
8. Show trips data in table

## 1 Aug 2023

1. Use fetch method to retrieve data
2. Add lifting state
3. Add charts
4. Build isOnTime logic
5. Use chart.js for charts
6. Charts improvements - seed more dummy data, set range to 5 days
7. Table improvements - use Mantine datatable, add pagination

MVP Complete

## 2 Aug 2023

1. Move API url and key to env
2. Format statuses in trips table
3. Daily Delivery Chart: Update Y-axis to show only integers
4. Add search functionality to table
5. Add date filter to trips table
6. Change recordId to clientReference

## 3 Aug 2023

1. Add sort by dates

Stretch goals

- Write unit tests
- Use D3 for charts

## Limitations

- Chart doesn't show a date if there are no data points for those dates
