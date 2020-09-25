$(document).ready(function () {
  $(".carousel").carousel();

  var profileInfo = {
    team: {
      name: "Meet Our Team",
      blurb:
        "We are a group of individuals from a variety of backgrounds taking these pandemic times by the horns and choosing to learn the powerful art of coding!",
      gitHubLink: {
        url: "https://github.com/GnuArtemis/Music-Chord-Identifier",
        linkLable: "Github Link for project details",
      },
      linkedInLink: {
        url: "#",
        linkLable: "",
      },
    },

    caitlin: {
      name: "Caitlin Bouroncle",
      blurb: "I am a momager, and a manager, a runner, a dreamer. I am proud to be in the UW Bootcamp for Full Stack Developers, and am excited beyond measure to take my new skills to new heights! Please follow my links and get to know me",
      gitHubLink: {
        url: "https://github.com/caitlinbou",
        linkLable: "Caitlin's Github",
      },
      linkedInLink: {
        url: "https://www.linkedin.com/in/caitlin-bouroncle-185b75182/",
        linkLable: "Caitlin's LinkedIn",
      },
    },

    ann: {
      name: "Ann Guinee",
      blurb: "I am a musician and a mathematician and the Concept Creator of this project. I love to keep my brain working, and am a strong leader.",
      gitHubLink: {
        url: "#",
        linkLable: "Ann's Github",
      },
      linkedInLink: {
        url: "#",
        linkLable: "Ann's LinkedIn",
      },
    },

    matt: {
      name: "Matt Weber",
      blurb: "I am a wizard with this coding biz already, and can get you out of many sticky situations. Hire me now! And I have a kid.",
      gitHubLink: {
        url: "#",
        linkLable: "Matt's Github",
      },
      linkedInLink: {
        url: "#",
        linkLable: "Matt's LinkedIn",
      },
    },

    petar: {
      name: "Petar Zivkovic",
      blurb: "I have been in construction for years, am always eager to help, and can not WAIT to move into a new career in coding.",
      gitHubLink: {
        url: "#",
        linkLable: "Petar's Github",
      },
      linkedInLink: {
        url: "#",
        linkLable: "Petar's LinkedIn",
      },
    },

    scott: {
      name: "Scott Dancer",
      blurb: "I am an artist who lives at the best beach in the Northwest, and love a good challenge. I also make a mean cocktail, but can't wait to be a developer instead.",
      gitHubLink: {
        url: "#",
        linkLable: "Scott's Github",
      },
      linkedInLink: {
        url: "#",
        linkLable: "Scott's LinkedIn",
      },
    },
  };

  $(".carousel").carousel({
    duration: 100,
    indicators: true,
    onCycleTo: function (data) {
      var id = data.id;
      if (id == data.id) {
        $(".profile").text(profileInfo[id].name);
        $(".blurb").text(profileInfo[id].blurb);
        $(".github").text(profileInfo[id].gitHubLink.linkLable);
        $(".github").attr("href", profileInfo[id].gitHubLink.url);
        $(".linkedin").text(profileInfo[id].linkedInLink.linkLable);
        $(".linkedin").attr("href", profileInfo[id].linkedInLink.url);
      }
    },
  });
});
//   // $("#team")
//   $(".profile").text("Our Team");
//   $(".blurb").text("What we are about");
//   $(".github").text("Project Github");
//   $(".github").attr(
//     "href",
//     "https://github.com/GnuArtemis/Music-Chord-Identifier"
//   );
//   $(".linkedin").text("");
//   $(".linkedin").attr("href", "#");

//   if ($("#caitlin").hasClass("active")) {
//     $(".profile").text("Caitlin Bouroncle");
//     $(".blurb").text("Hi I'm Caitlin");
//     $(".github").text("Caitlin's Github");
//     $(".github").attr("href", "https://github.com/caitlinbou");
//     $(".linkedin").text("Caitlin's LinkedIn");
//     $(".linkedin").attr(
//       "href",
//       "https://www.linkedin.com/in/caitlin-bouroncle-185b75182/"
//     );
//   }

//   // $("#ann")
//   $(".profile").text("Ann Guinee");
//   $(".blurb").text("Hi I'm Ann");
//   $(".github").text("Ann's Github");
//   $(".github").attr("href", "#");
//   $(".linkedin").text("Ann's LinkedIn");
//   $(".linkedin").attr("href", "#");

//   // $("#matt")
//   $(".profile").text("Matt Weber");
//   $(".blurb").text("Hi I'm Matt");
//   $(".github").text("Matt's Github");
//   $(".github").attr("href", "#");
//   $(".linkedin").text("Matt's LinkedIn");
//   $(".linkedin").attr("href", "#");

//   // $("#petar")
//   $(".profile").text("Petar Zivkovic");
//   $(".blurb").text("Hi I'm Petar");
//   $(".github").text("Petar's Github");
//   $(".github").attr("href", "#");
//   $(".linkedin").text("Petar's LinkedIn");
//   $(".linkedin").attr("href", "#");

//   // $("#scott")
//   $(".profile").text("Scott Dancer");
//   $(".blurb").text("Hi I'm Scott");
//   $(".github").text("Scott's Github");
//   $(".github").attr("href", "#");
//   $(".linkedin").text("Scott's LinkedIn");
//   $(".linkedin").attr("href", "#");
