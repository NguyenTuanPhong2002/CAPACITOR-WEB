$(document).ready(function () {
    var cosFiChartData = {
        labels: [],
        datasets: [
            {
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'red',
                pointColor: 'red',
                pointStrokeColor: 'white',
                data: [],
            },
        ],
    }

    var reactivePowerChartData = {
        labels: [],
        datasets: [
            {
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'red',
                pointColor: 'red',
                pointStrokeColor: 'white',
                data: [],
            },
        ],
    }

    var activePowerChartData = {
        labels: [],
        datasets: [
            {
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'red',
                pointColor: 'red',
                pointStrokeColor: 'white',
                data: [],
            },
        ],
    }

    var cosFiLineChart = new Chart(
        document.getElementById('canvasCosFi').getContext('2d')
    )

    var reactivePowerLineChart = new Chart(
        document.getElementById('canvasReactivePower').getContext('2d')
    )

    var activePowerLineChart = new Chart(
        document.getElementById('canvasActivePower').getContext('2d')
    )

    const firebaseConfig = {
        apiKey: 'AIzaSyBPLuNA3QZwjxP1kXLHEmYU9RBVR3V3_dM',
        authDomain: 'capacitor-129e8.firebaseapp.com',
        databaseURL: 'https://capacitor-129e8-default-rtdb.firebaseio.com',
        projectId: 'capacitor-129e8',
        storageBucket: 'capacitor-129e8.appspot.com',
        messagingSenderId: '1098068558082',
        appId: '1:1098068558082:web:88536e67456f45b7a5421b',
        measurementId: 'G-B6DF6M1ELZ',
    }

    firebase.initializeApp(firebaseConfig);
    var dbRef = firebase.database().ref('test')
    var postListRef = dbRef.orderByChild('TIME').limitToLast(1)
    var lastest_time
    var cosFis_AM = []
    var cosFis_PM = []
    var reactivePowers_AM = []
    var reactivePowers_PM = []
    var activePowers_AM = []
    var activePowers_PM = []
    var times_AM = []
    var times_PM = []
    var dataTable_AM = '';
    var dataTable_PM = '';
    postListRef.on('value', function (snapshot) {

        snapshot.forEach(function (keysSnapshot) {
            const voltage = keysSnapshot
                .child('Three-phase Equivalent Voltage')
                .val()
            const current = keysSnapshot
                .child('Three-phase Equivalent Current')
                .val()
            const frequency = keysSnapshot.child('Frequency').val()
            const activePower = keysSnapshot.child('ActivePowe').val()
            const reactivePower = keysSnapshot.child('ReactivePower').val()
            const cosFi = keysSnapshot.child('CosFi').val()
            const time = keysSnapshot.child('TIME').val()

            const coil_1 = keysSnapshot.child('Coil 1').val()
            const coil_2 = keysSnapshot.child('Coil 2').val()
            const coil_3 = keysSnapshot.child('Coil 3').val()
            const coil_4 = keysSnapshot.child('Coil 4').val()

            const contactor_1 = keysSnapshot.child('Contactor1').val()
            const contactor_2 = keysSnapshot.child('Contactor2').val()
            const contactor_3 = keysSnapshot.child('Contactor3').val()
            const contactor_4 = keysSnapshot.child('Contactor4').val()

            lastest_time = time
            updateOperatingParameters(
                voltage,
                current,
                frequency,
                activePower,
                reactivePower,
                cosFi,
                time
            )
            updateContactorStatus(
                coil_1,
                coil_2,
                coil_3,
                coil_4,
                contactor_1,
                contactor_2,
                contactor_3,
                contactor_4
            )
        })

        // Update data table when loading first
        var lastest_date = lastest_time.split(',')[0]
        var filterDataList = dbRef
            .orderByChild('TIME')
            .startAt(`${lastest_date}, 00:00:00`)
            .endAt(`${lastest_date},23:59:59`)
        var output = ''
        filterDataList.on('value', function (snapshot) {
            // console.log(snapshot.val())
            times_AM = []
            times_PM = []
            reactivePowers_AM = []
            reactivePowers_PM = []
            activePowers_AM = []
            activePowers_PM = []
            cosFis_AM = []
            cosFis_PM = []
            dataTable_AM = ''
            dataTable_PM = ''

            snapshot.forEach(function (keysSnapshot) {
                // Update data table
                const voltage = keysSnapshot
                    .child('Three-phase Equivalent Voltage')
                    .val()
                const current = keysSnapshot
                    .child('Three-phase Equivalent Current')
                    .val()
                const frequency = keysSnapshot.child('Frequency').val()
                const activePower = keysSnapshot.child('ActivePowe').val()
                const reactivePower = keysSnapshot.child('ReactivePower').val()
                const cosFi = keysSnapshot.child('CosFi').val()
                const time = keysSnapshot.child('TIME').val()
                const contactor_1 = keysSnapshot.child('Contactor1').val()
                const contactor_2 = keysSnapshot.child('Contactor2').val()
                const contactor_3 = keysSnapshot.child('Contactor3').val()
                const contactor_4 = keysSnapshot.child('Contactor4').val()

                time_split = splitDateTime(time)

                // Update chart
                // cosFi
                if (checkTimeAmOrPm(time_split) == 'AM') {
                    if (cleanTime(time_split)) {
                        cosFis_AM.push(cosFi)
                        reactivePowers_AM.push(reactivePower)
                        activePowers_AM.push(activePower)
                        times_AM.push(time_split)
                        dataTable_AM +=
                            '<tr><td>' +
                            time +
                            '</td><td>' +
                            voltage +
                            '</td><td>' +
                            frequency +
                            '</td><td>' +
                            current +
                            '</td><td>' +
                            cosFi +
                            '</td><td>' +
                            activePower +
                            '</td><td>' +
                            reactivePower +
                            '</td><td>' +
                            contactor_1 +
                            '</td><td>' +
                            contactor_2 +
                            '</td><td>' +
                            contactor_3 +
                            '</td><td>' +
                            contactor_4 +
                            '</td></tr>'
                    }
                } else {
                    if (cleanTime(time_split)) {
                        cosFis_PM.push(cosFi)
                        reactivePowers_PM.push(reactivePower)
                        activePowers_PM.push(activePower)
                        times_PM.push(time_split)
                        dataTable_PM +=
                            '<tr><td>' +
                            time +
                            '</td><td>' +
                            voltage +
                            '</td><td>' +
                            frequency +
                            '</td><td>' +
                            current +
                            '</td><td>' +
                            cosFi +
                            '</td><td>' +
                            activePower +
                            '</td><td>' +
                            reactivePower +
                            '</td><td>' +
                            contactor_1 +
                            '</td><td>' +
                            contactor_2 +
                            '</td><td>' +
                            contactor_3 +
                            '</td><td>' +
                            contactor_4 +
                            '</td></tr>'
                    }
                }
            })

            document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_AM
            document.getElementById('datepicker').value = lastest_date
            cosFiChartData.labels = times_AM
            cosFiChartData.datasets[0].data = cosFis_AM
            cosFiLineChart.Line(cosFiChartData)

            reactivePowerChartData.labels = times_AM
            reactivePowerChartData.datasets[0].data = reactivePowers_AM
            reactivePowerLineChart.Line(reactivePowerChartData)

            activePowerChartData.labels = times_AM
            activePowerChartData.datasets[0].data = activePowers_AM
            activePowerLineChart.Line(activePowerChartData)

            $('#filterTimeCosFi').on('change', function () {
                var time_check = $('#filterTimeCosFi').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    cosFiChartData.labels = times_AM
                    cosFiChartData.datasets[0].data = cosFis_AM
                    cosFiLineChart.Line(cosFiChartData)
                } else if (time_check == 'PM') {
                    cosFiChartData.labels = times_PM
                    cosFiChartData.datasets[0].data = cosFis_PM
                    cosFiLineChart.Line(cosFiChartData)
                }
            })

            $('#filterTimeReactivePower').on('change', function () {
                var time_check = $('#filterTimeReactivePower').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    reactivePowerChartData.labels = times_AM
                    reactivePowerChartData.datasets[0].data = reactivePowers_AM
                    reactivePowerLineChart.Line(reactivePowerChartData)
                } else if (time_check == 'PM') {
                    reactivePowerChartData.labels = times_PM
                    reactivePowerChartData.datasets[0].data = reactivePowers_PM
                    reactivePowerLineChart.Line(reactivePowerChartData)
                }
            })

            $('#filterTimeActivePower').on('change', function () {
                var time_check = $('#filterTimeActivePower').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    activePowerChartData.labels = times_AM
                    activePowerChartData.datasets[0].data = activePowers_AM
                    activePowerLineChart.Line(activePowerChartData)
                } else if (time_check == 'PM') {
                    activePowerChartData.labels = times_PM
                    activePowerChartData.datasets[0].data = activePowers_PM
                    activePowerLineChart.Line(activePowerChartData)
                }
            })

            $('#filterTimeDataTable').on('change', function () {
                var time_check = $('#filterTimeDataTable').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_AM
                } else if (time_check == 'PM') {
                    document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_PM
                }
            })
        })
        console.log(`lastest_date ${lastest_date}`)
    })

    function updateOperatingParameters(
        voltage,
        current,
        frequency,
        activePower,
        reactivePower,
        cosFi,
        time
    ) {
        document.getElementById('voltage').innerText = voltage
        document.getElementById('current').innerText = current
        document.getElementById('frequency').innerText = frequency
        document.getElementById('activePower').innerText = activePower
        document.getElementById('reactivePower').innerText = reactivePower
        document.getElementById('cosFi').innerText = cosFi
        document.getElementById('time').innerText = time
    }

    function updateContactorStatus(
        coil_1,
        coil_2,
        coil_3,
        coil_4,
        contactor_1,
        contactor_2,
        contactor_3,
        contactor_4
    ) {
        if (coil_1 == 1) {
            document.getElementById('colorID1').style.color = 'red'
        } else {
            document.getElementById('colorID1').style.color = 'green'
        }

        if (coil_2 == 1) {
            document.getElementById('colorID2').style.color = 'red'
        } else {
            document.getElementById('colorID2').style.color = 'green'
        }

        if (coil_3 == 1) {
            document.getElementById('colorID3').style.color = 'red'
        } else {
            document.getElementById('colorID3').style.color = 'green'
        }

        if (coil_4 == 1) {
            document.getElementById('colorID4').style.color = 'red'
        } else {
            document.getElementById('colorID4').style.color = 'green'
        }

        if (contactor_1 == 1) {
            document.getElementById('colorID5').style.color = 'red'
        } else {
            document.getElementById('colorID5').style.color = 'green'
        }

        if (contactor_2 == 1) {
            document.getElementById('colorID6').style.color = 'red'
        } else {
            document.getElementById('colorID6').style.color = 'green'
        }

        if (contactor_3 == 1) {
            document.getElementById('colorID7').style.color = 'red'
        } else {
            document.getElementById('colorID7').style.color = 'green'
        }

        if (contactor_4 == 1) {
            document.getElementById('colorID8').style.color = 'red'
        } else {
            document.getElementById('colorID8').style.color = 'green'
        }
    }

    $('#datepicker').datepicker({
        dateFormat: 'yy/mm/dd',
    })

    $('#datepicker').on('mouseover', function () {
        times_AM = []
        times_PM = []
        cosFis_AM = []
        cosFis_PM = []
        reactivePowers_AM = []
        reactivePowers_PM = []
        activePowers_AM = []
        activePowers_PM = []
        document.getElementById('filterTimeCosFi').value = "AM"
        document.getElementById('filterTimeReactivePower').value = "AM"
        document.getElementById('filterTimeActivePower').value = "AM"
        document.getElementById('filterTimeDataTable').value = "AM"
        var date = $('#datepicker').val()
        console.log(date);
        var filterDataList = dbRef
            .orderByChild('TIME')
            .startAt(`${date}, 00:00:00`)
            .endAt(`${date},23:59:59`)
        var dataTable_AM = ''
        var dataTable_PM = ''
        filterDataList.on('value', function (snapshot) {
            snapshot.forEach(function (keysSnapshot) {
                // Update data table
                const voltage = keysSnapshot
                    .child('Three-phase Equivalent Voltage')
                    .val()
                const current = keysSnapshot
                    .child('Three-phase Equivalent Current')
                    .val()
                const frequency = keysSnapshot.child('Frequency').val()
                const activePower = keysSnapshot.child('ActivePowe').val()
                const reactivePower = keysSnapshot.child('ReactivePower').val()
                const cosFi = keysSnapshot.child('CosFi').val()
                const time = keysSnapshot.child('TIME').val()
                const contactor_1 = keysSnapshot.child('Contactor1').val()
                const contactor_2 = keysSnapshot.child('Contactor2').val()
                const contactor_3 = keysSnapshot.child('Contactor3').val()
                const contactor_4 = keysSnapshot.child('Contactor4').val()

                time_split = splitDateTime(time)

                console.log(time);
                console.log(cosFi);

                console.log(checkTimeAmOrPm(time_split));

                if (checkTimeAmOrPm(time_split) == 'AM') {
                    console.log(!cleanTime(time_split));
                    //if (!cleanTime(time_split)) {
                    if (true) {
                        cosFis_AM.push(cosFi)
                        reactivePowers_AM.push(reactivePower)
                        activePowers_AM.push(activePower)
                        times_AM.push(time_split)
                        dataTable_AM +=
                            '<tr><td>' +
                            time +
                            '</td><td>' +
                            voltage +
                            '</td><td>' +
                            frequency +
                            '</td><td>' +
                            current +
                            '</td><td>' +
                            cosFi +
                            '</td><td>' +
                            activePower +
                            '</td><td>' +
                            reactivePower +
                            '</td><td>' +
                            contactor_1 +
                            '</td><td>' +
                            contactor_2 +
                            '</td><td>' +
                            contactor_3 +
                            '</td><td>' +
                            contactor_4 +
                            '</td></tr>'
                    }
                } else {
                    // if (cleanTime(time_split)) {
                    if (true) {
                        cosFis_PM.push(cosFi)
                        reactivePowers_PM.push(reactivePower)
                        activePowers_PM.push(activePower)
                        times_PM.push(time_split)
                        dataTable_PM +=
                            '<tr><td>' +
                            time +
                            '</td><td>' +
                            voltage +
                            '</td><td>' +
                            frequency +
                            '</td><td>' +
                            current +
                            '</td><td>' +
                            cosFi +
                            '</td><td>' +
                            activePower +
                            '</td><td>' +
                            reactivePower +
                            '</td><td>' +
                            contactor_1 +
                            '</td><td>' +
                            contactor_2 +
                            '</td><td>' +
                            contactor_3 +
                            '</td><td>' +
                            contactor_4 +
                            '</td></tr>'
                    }
                }
            })

            document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_AM
            cosFiChartData.labels = times_AM
            cosFiChartData.datasets[0].data = cosFis_AM
            cosFiLineChart.Line(cosFiChartData)

            reactivePowerChartData.labels = times_AM
            reactivePowerChartData.datasets[0].data = reactivePowers_AM
            reactivePowerLineChart.Line(reactivePowerChartData)

            activePowerChartData.labels = times_AM
            activePowerChartData.datasets[0].data = activePowers_AM
            activePowerLineChart.Line(activePowerChartData)

            $('#filterTimeCosFi').on('change', function () {
                var time_check = $('#filterTimeCosFi').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    cosFiChartData.labels = times_AM
                    cosFiChartData.datasets[0].data = cosFis_AM
                    cosFiLineChart.Line(cosFiChartData)
                } else if (time_check == 'PM') {
                    cosFiChartData.labels = times_PM
                    cosFiChartData.datasets[0].data = cosFis_PM
                    cosFiLineChart.Line(cosFiChartData)
                }
            })

            $('#filterTimeReactivePower').on('change', function () {
                var time_check = $('#filterTimeReactivePower').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    reactivePowerChartData.labels = times_AM
                    reactivePowerChartData.datasets[0].data = reactivePowers_AM
                    reactivePowerLineChart.Line(reactivePowerChartData)
                } else if (time_check == 'PM') {
                    reactivePowerChartData.labels = times_PM
                    reactivePowerChartData.datasets[0].data = reactivePowers_PM
                    reactivePowerLineChart.Line(reactivePowerChartData)
                }
            })

            $('#filterTimeActivePower').on('change', function () {
                var time_check = $('#filterTimeActivePower').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    activePowerChartData.labels = times_AM
                    activePowerChartData.datasets[0].data = activePowers_AM
                    activePowerLineChart.Line(activePowerChartData)
                } else if (time_check == 'PM') {
                    activePowerChartData.labels = times_PM
                    activePowerChartData.datasets[0].data = activePowers_PM
                    activePowerLineChart.Line(activePowerChartData)
                }
            })

            $('#filterTimeDataTable').on('change', function () {
                var time_check = $('#filterTimeDataTable').val()
                console.log(`time check ${time_check}`)
                if (time_check == 'AM') {
                    document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_AM
                } else if (time_check == 'PM') {
                    document.getElementById('table__filter-by-date-tbody').innerHTML = dataTable_PM
                }
            })
        })
    })

    // Handle cosFi chart
    function splitDateTime(time) {
        var time_split = time.split(',')
        var time_without_second = time_split[1].slice(0, 5)
        return time_without_second
    }

    function cleanTime(time) {
        var minute = time.slice(3, 5)
        var second = time.slice(6, 8)
        //        return parseInt(minute) % 10 == 0 ? true : false
        if ((parseInt(minute) % 10 == 0) && (1)) {
            return true
        }
        else return false
    }

    function checkTimeAmOrPm(time) {
        var hour = time.slice(0, 2)
        if (hour < 12) {
            return 'AM'
        } else {
            return 'PM'
        }
    }
})
