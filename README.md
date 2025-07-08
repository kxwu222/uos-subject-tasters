# EventWidget Standalone

A fully self-contained, CMS-ready JavaScript event widget. Easily embed real-time event listings on any website or CMS using a single JS file and a CSV data source.

## Features
- No dependencies, no build step—just one JS file
- Works in any CMS or static HTML page
- Real-time updates via a static CSV file
- Beautiful, responsive UI with search and filtering

## Quick Start

### 1. Upload the Files
- Upload `EventWidget.standalone.js` and your CSV file (e.g., `Sample - Subject Tasters (October 2025).csv`) to your CMS or web server, preferably in a `public` directory.

### 2. Add the Widget to Your Page
```html
<!-- Include the widget script -->
<script src="/public/widget/EventWidget.standalone.js"></script>

<!-- Widget container -->
<div id="event-widget-container"></div>

<!-- Initialize the widget -->
<script>
  new EventWidget(
    '#event-widget-container',
    '/public/Sample - Subject Tasters (October 2025).csv',
    {
      showPastEvents: false, // Hide past events (default: false)
      autoRefresh: true     // Auto-refresh every minute (default: true)
    }
  );
</script>
```

### 3. Using a Static CSV as Your Data Source
- Place your CSV file in the `public` directory (or wherever your web server serves static files from).
- Reference the path to your CSV file as the second argument to `EventWidget`.
- **Note:** The CSV file must include a column named `is_visible` with the value `true` for each event you want to display.

### 4. Options
| Option          | Type    | Default | Description                        |
|-----------------|---------|---------|------------------------------------|
| showPastEvents  | Boolean | false   | Show past events                   |
| autoRefresh     | Boolean | true    | Auto-refresh every minute          |

## Example Demo
See `demo.html` for a working example using a static CSV file as the data source.

## License
MIT