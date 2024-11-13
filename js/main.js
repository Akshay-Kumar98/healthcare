"use strict"



$(document).ready(function () {

  $(window).scroll(function () {

    if ($(window).scrollTop()) {

      $('.header').addClass('sticky');


    }



    else {

      $('.header').removeClass('sticky');




    }



  });

});



$(document).ready(function () {
  $('.click-btn').click(function () {

    var submenu = $(this).next('.sub-menu');

    submenu.slideToggle();

    $('.sub-menu').not(submenu).slideUp();
  })
});

$(document).ready(function () {
  $('.menu-btn').click(function () {

    var submenu = $(this).next('.sub-menu');

    submenu.slideToggle();

    $('.sub-menu').not(submenu).slideUp();
  })
});


$(document).ready(function () {
  $('.bar').click(function (e) {
    e.preventDefault();
    $('.layout').toggleClass('expand');
  })
})


var optionsInterval = {
  series: [
    {
      name: 'Traige Done',
      data: [24, 10, 8, 12, 34, 18, 32, 46, 58, 62, 32, 16],
    },
    {
      name: 'Traige Not Done',
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
  ],
  chart: {
    type: 'bar',
    height: 255
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    categories: [
      '12am - 2am', '2am - 4am', '4am - 6am', '6am - 8am', '8am - 10am',
      '10am - 12pm', '12pm - 2pm', '2pm - 4pm', '4pm - 6pm', '6pm - 8pm',
      '8pm - 10pm', '10pm - 12am'
    ],
  },
  yaxis: {
    title: {
      text: 'Total Visits'
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " visits";
      }
    }
  }
};

var chartInterval = new ApexCharts(document.querySelector("#chart-interval"), optionsInterval);
chartInterval.render();

var optionsZone = {
  series: [
    {
      name: 'Total Visits',
      data: [28, 46, 32, 58]
    }
  ],
  chart: {
    type: 'bar',
    height: 355
  },
  xaxis: {
    categories: ['Red Zone', 'Yellow Zone', 'Green Zone', 'Unallocated']
  },
  yaxis: {
    title: {
      text: 'Total Visits'
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " visits";
      }
    }
  }
};

var chartZone = new ApexCharts(document.querySelector("#chart-zone"), optionsZone);
chartZone.render();

var optionsPatientsInterval = {
  series: [
    {
      name: 'Total Visits',
      data: [28, 8, 12, 34, 18, 32, 46, 58, 62, 32, 16, 42]
    }
  ],
  chart: {
    type: 'bar',
    height: 355
  },
  xaxis: {
    categories: [
      '12am - 2am', '2am - 4am', '4am - 6am', '6am - 8am', '8am - 10am',
      '10am - 12pm', '12pm - 2pm', '2pm - 4pm', '4pm - 6pm', '6pm - 8pm',
      '8pm - 10pm', '10pm - 12am'
    ],
  },
  yaxis: {
    title: {
      text: 'Total Visits'
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " visits";
      }
    }
  }
};

var chartPatientsInterval = new ApexCharts(document.querySelector("#chart-patient-interval"), optionsPatientsInterval);
chartPatientsInterval.render();


var optionsPatientsDoctor = {
  series: [
    {
      name: "Total Visits",
      data: [28, 29, 33, 34, 40, 46, 58, 59, 36, 53, 42]
    },
    {
      name: "Avg Time",
      data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]
    }
  ],
  chart: {
    type: 'line',
    height: 355,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Patients by Doctor',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Dr. Alan', 'Dr. Bran', 'Dr. Clo', 'Dr. Dan', 'Dr. Eve', 'Dr. Fay', 'Dr. Geo', 'Dr. Hil', 'Dr. Ivy', 'Dr. Jun', 'Dr. Kev'],
    title: {
      text: 'Doctors'
    }
  },
  yaxis: {
    title: {
      text: 'Visits'
    }
  }
};

var chart = new ApexCharts(document.querySelector("#chart-patient-doctor"), optionsPatientsDoctor);
chart.render();


$(document).ready(function () {
  const itemsPerPage = 5;
  const doctorLists = $('.doctor-list');
  const totalPages = Math.ceil(doctorLists.length / itemsPerPage);
  let currentPage = 1; // Starting with page 1

  function updatePagination() {
    $('.page-numbers').empty();

    $('.prev-btn').toggleClass('hidden', currentPage === 1);

    $('.next-btn').toggleClass('hidden', currentPage === totalPages);

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage ||
        i === 1 ||
        i === totalPages ||
        i === currentPage - 1 ||
        i === currentPage + 1) {

        const pageSpan = $('<span>')
          .addClass('page-number')
          .text(i)
          .toggleClass('active', i === currentPage);
        $('.page-numbers').append(pageSpan);
      } else if (i === currentPage - 2 && currentPage > 3) {
        $('.page-numbers').append('<span class="dots">...</span>');
      } else if (i === currentPage + 2 && currentPage < totalPages - 2) {
        $('.page-numbers').append('<span class="dots">...</span>');
      }
    }
  }

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    doctorLists.removeClass('active').hide();
    doctorLists.slice(start, end).addClass('active').show();

    currentPage = page;
    updatePagination();
  }

  // Event delegation for page numbers
  $('.page-numbers').on('click', '.page-number', function () {
    const page = parseInt($(this).text());
    showPage(page);
  });

  // Previous button click
  $('.prev-btn').click(function () {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  // Next button click
  $('.next-btn').click(function () {
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  // Initialize first page
  showPage(currentPage);
});


// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.querySelectorAll('.shop-listing');
//   let currentPage = 1;
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(cards.length / itemsPerPage);
//   const prevBtn = document.querySelector('.prev-btn');
//   const nextBtn = document.querySelector('.next-btn');
//   const paginationBox = document.querySelector('.pagination-list');

//   function displayCards(page) {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     cards.forEach((card, index) => {
//       if (index >= startIndex && index < endIndex) {
//         card.style.display = 'flex';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   }

//   function updateButtons() {
//     paginationBox.innerHTML = '';
//     for (let i = 1; i <= totalPages; i++) {
//       const pageNumberBtn = document.createElement('a');
//       pageNumberBtn.textContent = i;
//       pageNumberBtn.classList.add('page-btn');
//       if (i === currentPage) {
//         pageNumberBtn.classList.add('active');
//       }

//       pageNumberBtn.addEventListener('click', function (e) {
//         e.preventDefault();
//         currentPage = i;
//         displayCards(currentPage);
//         updateButtons();
//       });

//       paginationBox.appendChild(pageNumberBtn);
//     }

//     if (currentPage === 1) {
//       prevBtn.classList.add('disabled');
//     } else {
//       prevBtn.classList.remove('disabled');
//     }

//     if (currentPage === totalPages) {
//       nextBtn.classList.add('disabled');
//     } else {
//       nextBtn.classList.remove('disabled');
//     }
//   }

//   prevBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     if (currentPage > 1) {
//       currentPage--;
//       displayCards(currentPage);
//       updateButtons();
//     }
//   });

//   nextBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayCards(currentPage);
//       updateButtons();
//     }
//   });

//   displayCards(currentPage);
//   updateButtons();

// });
