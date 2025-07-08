document.addEventListener('DOMContentLoaded', function() {
  var container1 = document.querySelector('#event-widget-container');
  if (container1) {
    new EventWidget(
      '#event-widget-container',
      './public/Sample - Subject Tasters (October 2025).csv',
      {
        showPastEvents: false,
        autoRefresh: true
      }
    );
  }
  var container2 = document.querySelector('#event-widget-demo');
  if (container2) {
    new EventWidget(
      '#event-widget-demo',
      'events.csv',
      {
        showPastEvents: false,
        autoRefresh: true
      }
    );
  }
}); 