window.onscroll = function () {
    myScroll()
}

function myScroll() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.querySelector('.js-user-profile').classList.add('is-stuck')
    } else if (document.body.scrollTop < 400 || document.documentElement.scrollTop < 400) {
        document.querySelector('.js-user-profile').classList.remove('is-stuck')
    }
}

const url = "https://api.github.com/graphql";

const query = `

{
    user(login: "billmal071") {
      id
      repositories(orderBy: {field: CREATED_AT, direction: DESC}, first: 20) {
        edges {
          node {
            id
            name
            description
            licenseInfo {
              body
              description
            }
            updatedAt
            forkCount
            primaryLanguage {
              id
              name
              color
            }
            stargazerCount
            isPrivate
          }
        }
      }
      bio
    }
  }  
`

const opt = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 2a2cd5faadbc79975c08cd72d176802ddad5d31b"
    },
    body: JSON.stringify({
        query
    })
}

let userRepo;

const fetchData = async () => {
    try {
        const res = await fetch(url, opt);
        const data = await res.json();
        console.log(data);
        displayRepo(data);
    } catch (err) {
        console.log(err)
    }

}

fetchData();
let time = new Date().getTime();
time = time / (1000 * 3600 * 24);
let yesterday = new Date("11/19/2020").getTime();
yesterday = yesterday / (1000 * 3600 * 24);
console.log(Math.round(time - yesterday))

function displayRepo(data) {
    let date = new Date().getTime();
    console.log(date)
    let bio = data.data.user.bio;
    document.querySelector('.bio-data').innerHTML = bio;
    let repositories = data.data.user.repositories.edges.map(node => node);
    console.log(repositories);
    document.querySelector('.user-repos').innerHTML = repositories.map((node) =>
        `
        <li
        class="col-12 d-flex width-full py-4 border-bottom color-border-secondary"
      >
        <div class="col-10 col-lg-9 d-inline-block">
          <div class="d-inline-block mb-4">
            <h3 class="wb-break-all">
              <a href="" class="hover-link">${node.node.name}</a>
              ${node.node.isPrivate ? `<span
                class="Label Label--outline v-align-middle ml-1 mb-1"
                >${node.node.isPrivate ? "Private" : ""}</span
              >` : ''}
            </h3>
            <span class="f-12 text-gray-mb-1">
              ${node.node.forked ? `Forked from <a href="" class="muted-link">Deborah/getting started</a>` : ''}
            </span>
          </div>
          <div>
            <p class="col-9 d-inline-block text-gray mb-2 pr-4">
              ${node.node.description ? node.node.description : ''}
            </p>
          </div>
          <div class="f-12 text-gray mt-8">
            ${node.node.primaryLanguage ? `<span class="ml-0 mr-16">
              <span class="repo-language-color" style="background-color: ${node.node.primaryLanguage ? node.node.primaryLanguage.color : ''}"></span>
              <span>${node.node.primaryLanguage ? node.node.primaryLanguage.name : ''}</span>
            </span>` : ''}
            ${node.node.forkCount > 0 ? `<a href="" class="muted-link mr-16">
              <svg
                aria-label="fork"
                class="octicon octicon-repo-forked"
                style="fill: gray"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                role="img"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
              ${node.node.forkCount}
            </a>` : ''}
            ${node.node.licenseInfo ? `<span class="mr-16">
              <svg
                class="octicon octicon-law mr-1"
                style="fill: gray"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                ></path>
              </svg>
              ${node.node.licenseInfo.body.slice(0, node.node.licenseInfo.body.indexOf('License')+8)}
            </span>` : ''}
            Updated <span>${Math.floor((date - new Date(node.node.updatedAt).getTime()) / (1000 * 3600 * 24)) > 30 ? 
                `on ${month(new Date(node.node.updatedAt).getMonth())+ " " + new Date(node.node.updatedAt).getDate()}` : 
                `${Math.floor((date - new Date(node.node.updatedAt).getTime()) / (1000 * 3600 * 24))} days ago`} </span>
          </div>
        </div>
        <div
          class="col-2 col-lg-3 d-flex flex-column flex-justify-around"
        >
          <div class="text-right">
            <div class="d-inline-block">
              <form action="">
                <button
                  class="btn btn-sm"
                  type="submit"
                  value="Star"
                >
                  <svg
                    class="octicon octicon-star mr-1"
                    style="fill: gray"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    ></path>
                  </svg>
                  Star
                </button>
              </form>
            </div>
          </div>
          <div class="text-right"></div>
        </div>
      </li>
        `
    )

}

function month(number) {
    switch (number) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "?"

    }
}

document.querySelector('#menu-opener').addEventListener('click', () => {
    document.querySelector('.header-item--full').classList.toggle('show')
})