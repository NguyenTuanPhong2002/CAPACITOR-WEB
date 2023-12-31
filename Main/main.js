// JavaScript code in the external file (script.js)
window.onload = function () {
    document.getElementById('DataMonitor').addEventListener('mouseover', function (event) {
        event.preventDefault(); // Prevent the default behavior of the link
        document.querySelector('.handle').style.display = 'block'; // Hide the div
    });

    // Thêm sự kiện mouseout
    document.getElementById('DataMonitor').addEventListener('click', function (event) {
        document.querySelector('.handle').style.display = 'none'; // Hide the div when mouseout
    });

    document.getElementById('realTimeMonitor').addEventListener('click', function (event) {
        document.querySelector('.handle').style.display = 'none'; // Hide the div when mouseout
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.notic').style.display = 'none';
        document.querySelector('.notic-info').style.display = 'none';
        document.querySelector('.row').style.display = 'block';
        document.querySelector('.table-main').style.display = 'block';
        document.querySelector('.table-moniter-day').style.display = 'none';
        document.querySelector('.map-table-monitoring').style.display = 'none';
        
    });


    document.getElementById('tableMoniterDay').addEventListener('click', function (event) {
        document.querySelector('.handle').style.display = 'none'; // Hide the div when mouseout
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.notic').style.display = 'none';
        document.querySelector('.notic-info').style.display = 'none';
        document.querySelector('.row').style.display = 'none';
        document.querySelector('.table-main').style.display = 'none';
        document.querySelector('.table-moniter-day').style.display = 'block';
        document.querySelector('.map-table-monitoring').style.display = 'none';

    });

    document.getElementById('mapTableMonitoring').addEventListener('click', function (event) {
        document.querySelector('.handle').style.display = 'none'; // Hide the div when mouseout
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.notic').style.display = 'none';
        document.querySelector('.notic-info').style.display = 'none';
        document.querySelector('.row').style.display = 'none';
        document.querySelector('.table-main').style.display = 'none';
        document.querySelector('.table-moniter-day').style.display = 'none';
        document.querySelector('.map-table-monitoring').style.display = 'block';

    });

    document.getElementById('tableDashboard').addEventListener('click', function (event) {
        document.querySelector('.handle').style.display = 'block'; // Hide the div when mouseout
        document.querySelector('.header').style.display = 'block';
        document.querySelector('.notic').style.display = 'flex';
        document.querySelector('.notic-info').style.display = 'block';
        document.querySelector('.row').style.display = 'none';
        document.querySelector('.table-main').style.display = 'none';
        document.querySelector('.table-moniter-day').style.display = 'none';
        document.querySelector('.map-table-monitoring').style.display = 'none';

    });
};