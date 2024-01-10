async function listenTime() {
    while (1) {
        var VA_LIST = document.getElementsByClassName('voltage')
        for (let index = 0; index < VA_LIST.length; index++) {
            let VA = VA_LIST[index]
            let dbRef = firebase
                .database()
                .ref()
                .child(
                    '1234/-NAnIiFb6WD7Du4rsBMb/CAPACITOR/Three-phase Equivalent Voltage'
                )
            dbRef.on('value', (snap) => (VA.innerText = snap.val()))
        }
        var IA_LIST = document.getElementsByClassName('current')
        for (let index = 0; index < VA_LIST.length; index++) {
            let IA = IA_LIST[index]
            let dbRef = firebase
                .database()
                .ref()
                .child(
                    '1234/-NAnIiFb6WD7Du4rsBMb/CAPACITOR/Three-phase Equivalent Current'
                )
            dbRef.on('value', (snap) => (IA.innerText = snap.val()))
        }
        var CosFi_LIST = document.getElementsByClassName('CosFi')
        for (let index = 0; index < VA_LIST.length; index++) {
            let CosFi = CosFi_LIST[index]
            let dbRef = firebase.database().ref().child('test/CosFi')
            dbRef.on('value', (snap) => (CosFi.innerText = snap.val()))
        }
        var ActivePower_LIST = document.getElementsByClassName('activepower')
        for (let index = 0; index < VA_LIST.length; index++) {
            let ActivePower = ActivePower_LIST[index]
            let dbRef = firebase.database().ref().child('test/ActivePowe')
            dbRef.on('value', (snap) => (ActivePower.innerText = snap.val()))
        }
        var ReactivePower_LIST =
            document.getElementsByClassName('reactivepower')
        for (let index = 0; index < VA_LIST.length; index++) {
            let ReactivePower = ReactivePower_LIST[index]
            let dbRef = firebase.database().ref().child('test/ReactivePower')
            dbRef.on('value', (snap) => (ReactivePower.innerText = snap.val()))
        }
        var T1_LIST = document.getElementsByClassName('T1')
        for (let index = 0; index < VA_LIST.length; index++) {
            let T1 = T1_LIST[index]
            let dbRef = firebase.database().ref().child('test/Coil 1')
            dbRef.on('value', (snap) => (T1.innerText = snap.val()))
        }
        var T2_LIST = document.getElementsByClassName('T2')
        for (let index = 0; index < VA_LIST.length; index++) {
            let T2 = T2_LIST[index]
            let dbRef = firebase.database().ref().child('test/Coil 2')
            dbRef.on('value', (snap) => (T2.innerText = snap.val()))
        }
        var T3_LIST = document.getElementsByClassName('T3')
        for (let index = 0; index < VA_LIST.length; index++) {
            let T3 = T3_LIST[index]
            let dbRef = firebase.database().ref().child('test/Coil 3')
            dbRef.on('value', (snap) => (T3.innerText = snap.val()))
        }
        var T4_LIST = document.getElementsByClassName('T4')
        for (let index = 0; index < VA_LIST.length; index++) {
            let T4 = T4_LIST[index]
            let dbRef = firebase.database().ref().child('test/Coil 4')
            dbRef.on('value', (snap) => (T4.innerText = snap.val()))
        }

        var currentHour = new Date().getHours()
        console.log(`Khoi tao lai gia tri: ${currentHour}`)
        if (currentHour == 0) {
            try {
                document.getElementsByClassName(`voltage${j}`)[0].innerText = ''
                document.getElementsByClassName(`current${j}`)[0].innerText = ''
                document.getElementsByClassName(`CosFi${j}`)[0].innerText = ''
                document.getElementsByClassName(
                    `activepower${j}`
                )[0].innerText = ''
                document.getElementsByClassName(
                    `reactivepower${j}`
                )[0].innerText = ''
                document.getElementsByClassName(`T1${j}`)[0].innerText = ''
                document.getElementsByClassName(`T2${j}`)[0].innerText = ''
                document.getElementsByClassName(`T3${j}`)[0].innerText = ''
                document.getElementsByClassName(`T4${j}`)[0].innerText = ''
            } catch (error) {}
        }

        var VA_TIME = document.getElementsByClassName(
            `voltage${currentHour}`
        )[0]
        var dbRef = firebase
            .database()
            .ref()
            .child(
                '1234/-NAnIiFb6WD7Du4rsBMb/CAPACITOR/Three-phase Equivalent Voltage'
            )
        dbRef.on('value', (snap) => (VA_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var IA_TIME = document.getElementsByClassName(
            `current${currentHour}`
        )[0]
        var dbRef = firebase
            .database()
            .ref()
            .child(
                '1234/-NAnIiFb6WD7Du4rsBMb/CAPACITOR/Three-phase Equivalent Current'
            )
        dbRef.on('value', (snap) => (IA_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var CosFi_TIME = document.getElementsByClassName(
            `CosFi${currentHour}`
        )[0]
        var dbRef = firebase.database().ref().child('test/CosFi')
        dbRef.on('value', (snap) => (CosFi_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var ActivePower_TIME = document.getElementsByClassName(
            `activepower${currentHour}`
        )[0]
        var dbRef = firebase.database().ref().child('test/ActivePowe')
        dbRef.on('value', (snap) => (ActivePower_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var ReactivePower_TIME = document.getElementsByClassName(
            `reactivepower${currentHour}`
        )[0]
        var dbRef = firebase.database().ref().child('test/ReactivePower')
        dbRef.on('value', (snap) => (ReactivePower_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var T1_TIME = document.getElementsByClassName(`T1${currentHour}`)[0]
        var dbRef = firebase.database().ref().child('test/Coil 1')
        dbRef.on('value', (snap) => (T1_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var T2_TIME = document.getElementsByClassName(`T2${currentHour}`)[0]
        var dbRef = firebase.database().ref().child('test/Coil 2')
        dbRef.on('value', (snap) => (T2_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var T3_TIME = document.getElementsByClassName(`T3${currentHour}`)[0]
        var dbRef = firebase.database().ref().child('test/Coil 3')
        dbRef.on('value', (snap) => (T3_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))

        var T4_TIME = document.getElementsByClassName(`T4${currentHour}`)[0]
        var dbRef = firebase.database().ref().child('test/Coil 4')
        dbRef.on('value', (snap) => (T4_TIME.innerText = snap.val()))
        await new Promise((r) => setTimeout(r, 60000))
    }
}
