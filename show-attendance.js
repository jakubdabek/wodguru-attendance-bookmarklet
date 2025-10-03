(function () {
    try {
        const askLocation = "\n\nMake sure you're on the right page. Go to your training page?";
        const trainingUrl = 'https://szkolatancajustmovedance.wod.guru/my-training';

        const suffix = '/my-training/facility-meta/get-hide-attendance';
        let foundKey = null;

        /* Find the matching key in localStorage */
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.endsWith(suffix)) {
                foundKey = k;
                break;
            }
        }

        if (!foundKey) {
            console.error('No matching key found in localStorage');
            if (confirm(`⚠️ Could not find attendance settings.${askLocation}`)) {
                location.href = trainingUrl;
            }
            return;
        }

        let obj = JSON.parse(localStorage.getItem(foundKey));
        if (!obj || !obj.data) {
            console.error('Invalid object format for key', foundKey, obj);
            if (confirm(`⚠️ Found the settings, but it looks broken.${askLocation}`)) {
                location.href = trainingUrl;
            }
            return;
        }

        console.log('Before update:', JSON.parse(JSON.stringify(obj)));

        obj.data.hideAttendance = 0;
        obj.expiration = Date.now() + 30 * 24 * 60 * 60 * 1000; /* unix timestamp +30 days */

        localStorage.setItem(foundKey, JSON.stringify(obj));

        console.log('After update:', obj);

        alert('Attendance visibility has been updated.\n');
    } catch (e) {
        console.error('Unexpected error:', e);
        if (confirm(`⚠️ Something went wrong while updating settings.${askLocation}`)) {
            location.href = trainingUrl;
        }
    }
})();
