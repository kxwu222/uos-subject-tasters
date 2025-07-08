document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('#event-widget-container');
  if (container) {
    new EventWidget(
      '#event-widget-container',
      'public/widget/Sample - Subject Tasters (October 2025).csv',
      {
        showPastEvents: false,
        autoRefresh: true
      }
    );
  }
}); 