// Mobile harbinger menu
const mobileBtn = document.getElementById('mobile');
const navLinks = document.getElementById('nav-links');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('change');
    navLinks.classList.toggle('nav-links-show');
});

// Header scrolled down shadow effect
const header = document.getElementById('navbar');
const scrollHeader = document.getElementsByClassName('navbar-scrolled');

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('navbar-scrolled');
    } else {
        header.classList.remove('navbar-scrolled');
    }
}


// Scroll to top
window.addEventListener('scroll', scrollHeader)
    // show scroll top
const scrollUp = document.getElementById('scrolltop');
window.addEventListener('scroll', () => {
    scrollUp.classList.toggle('to-top-show', window.scrollY >= 560);
});



// Get Estimates
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const eModal = document.getElementById('e-modal');
    const closeButton = document.getElementsByClassName('e-close')[0];
    const closeButton2 = document.getElementsByClassName('close-2')[0];
    const estimateForm = document.getElementById('estimateForm');
    const loader = document.getElementById('load-container');
    const calcSection = document.getElementById('calculations');
    const result = document.getElementById('result');
    const estimatedPriceElement = document.getElementById('estimatedPrice');

    openModalBtn.addEventListener('click', () => {
        eModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        eModal.style.display = 'none';
    });

    closeButton2.addEventListener('click', () => {
        eModal.style.display = 'none';
    });

    estimateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        loader.classList.remove('hidden');

        /*result.classList.add('hidden');*/

        // Check if the estimated price has already been calculated
        /*if (estimatedPrice !== 0) {
            estimatedPriceElement.textContent = `₦${estimatedPrice}`;
            result.classList.remove('hidden');
            loader.classList.add('hidden');

            return;
        }*/

        function formatDate(dateString) {
            const dateObj = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return dateObj.toLocaleDateString(undefined, options);
        }

        const serviceType = document.getElementById('serviceType').value;
        const serviceDate = document.getElementById('serviceDate').value;
        const serviceTime = document.getElementById('serviceTime').value;
        const serviceLocation = document.getElementById('serviceLocation').value;

        //Defined Price Ranges
        const priceRanges = {
            homeCleaning: [20000, 30000],
            officeCleaning: [45000, 56000],
            indoorCleaning: [15000, 25000],
            maintenance: [10000, 20000],
            fumigation: [10000, 25000]
        };

        //Calculation for the estimated prices based on the user input
        let estimatedPrice = 0;

        if (serviceType === 'homeCleaning') {
            estimatedPrice = (
                Math.random() * (priceRanges.homeCleaning[1] - priceRanges.homeCleaning[0]) + priceRanges.homeCleaning[0]
            ).toFixed(2);
        } else if (serviceType === 'officeCleaning') {
            estimatedPrice = (
                Math.random() * (priceRanges.officeCleaning[1] - priceRanges.officeCleaning[0]) + priceRanges.officeCleaning[0]
            ).toFixed(2);
        } else if (serviceType === 'indoorCleaning') {
            estimatedPrice = (
                Math.random() * (priceRanges.indoorCleaning[1] - priceRanges.indoorCleaning[0]) + priceRanges.indoorCleaning[0]
            ).toFixed(2);
        } else if (serviceType === 'maintenance') {
            estimatedPrice = (
                Math.random() * (priceRanges.maintenance[1] - priceRanges.maintenance[0]) + priceRanges.maintenance[0]
            ).toFixed(2);
        } else if (serviceType === 'fumigation') {
            estimatedPrice = (
                Math.random() * (priceRanges.fumigation[1] - priceRanges.fumigation[0]) + priceRanges.fumigation[0]
            ).toFixed(2);
        }

        //Get values
        const serviceTypeCell = document.getElementById('serviceTypeCell');
        const serviceDateCell = document.getElementById('serviceDateCell');
        const serviceTimeCell = document.getElementById('serviceTimeCell');
        const serviceLocationCell = document.getElementById('serviceLocationCell');

        serviceTypeCell.innerText = serviceType;
        serviceDateCell.innerText = formatDate(serviceDate);
        serviceTimeCell.innerText = serviceTime;
        serviceLocationCell.innerText = serviceLocation;

        if (serviceType === 'default') {
            serviceTypeCell.innerText = '-- ERROR : Empty Service Type';
            serviceTypeCell.style.color = 'red';
            serviceTypeCell.style.fontStyle = 'italic';
        } else if (serviceType === 'homeCleaning') {
            serviceTypeCell.innerText = 'Home Cleaning';
        } else if (serviceType === 'officeCleaning') {
            serviceTypeCell.innerText = 'Office Cleaning';
        } else if (serviceType === 'indoorCleaning') {
            serviceTypeCell.innerText = 'Indoor Cleaning';
        } else if (serviceType === 'maintenance') {
            serviceTypeCell.innerText = 'Maintenance';
        } else if (serviceType === 'fumigation') {
            serviceTypeCell.innerText = 'Fumigation';
        }

        // Error Messages
        if (serviceDate === '') {
            serviceDateCell.innerText = '-- ERROR : Empty Date Field';
            serviceDateCell.style.color = 'red';
            serviceDateCell.style.fontStyle = 'italic';
        }
        if (serviceTime === '') {
            serviceTimeCell.innerText = '-- ERROR : Empty Time Field';
            serviceTimeCell.style.color = 'red';
            serviceTimeCell.style.fontStyle = 'italic';
        }
        if (serviceLocation === '') {
            serviceLocationCell.innerText = '-- ERROR : No Location Added';
            serviceLocationCell.style.color = 'red';
            serviceLocationCell.style.fontStyle = 'italic';
        }


        //Remove in actual implementation. For demonstration purposes
        setTimeout(() => {
            loader.classList.add('hidden');
            calcSection.classList.remove('hidden');
            estimatedPriceElement.textContent = `₦${estimatedPrice}`;
            if (serviceDate === '') {
                estimatedPriceElement.textContent = '₦0';
            }
            if (serviceTime === '') {
                estimatedPriceElement.textContent = '₦0';
            }
            if (serviceLocation === '') {
                estimatedPriceElement.textContent = '₦0';
            }
            estimatedPriceElement.classList.remove('hidden');
        }, 5500);
    });

    const backButton = document.getElementById('goBack');
    backButton.addEventListener('click', () => {
        calcSection.classList.add('hidden');
    });
});

// Function Print
document.getElementById('printBtn').addEventListener('click', function() {
    const sectionToPrint = document.getElementById('est-result').innerHTML;

    const printWindow = window.open('', '_blank');

    printWindow.document.open();

    printWindow.document.write(`
        <html>
            <head>
                <title>Print Estimate | 3pple T</title>
                <link rel="stylesheet" type="text/css" href="./assets/css/print.css">
            </head>
            <body>
                ${sectionToPrint}
            </body>
        </html>
    `)

    printWindow.document.close();
    printWindow.focus();

    printWindow.print();
});