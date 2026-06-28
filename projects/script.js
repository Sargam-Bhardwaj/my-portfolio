$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
    
    
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Sargam Bhardwaj";
            $("#favicon").attr("href", "/assets/images/heart.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/heart.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    
    projects.forEach(project => {
        // Combines categories into spaces so filters can read them cleanly
        let categoryClasses = Array.isArray(project.category) ? project.category.join(" ") : project.category;

        // Keeps exact class hierarchy from the home screen section
        projectsHTML += `
        <div class="box tilt ${categoryClasses}">
          <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;
    });
    
    projectsContainer.innerHTML = projectsHTML;

    // Filter handling mapped precisely onto the box element array
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        
        var filterValue = $(this).attr('data-filter');
        
        if (filterValue === '*') {
            $('.box-container .box').fadeIn(400);
        } else {
            $('.box-container .box').not(filterValue).fadeOut(200);
            $('.box-container .box').filter(filterValue).fadeIn(400);
        }
    });

    // VanillaTilt configuration matching home styles
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }
}

getProjects().then(data => {
    showProjects(data);
});
// fetch projects end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}