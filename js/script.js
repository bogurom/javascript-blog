'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const clickedElementAtribute = clickedElement.getAttribute('href');
  console.log('Attribute of clicked link: ', clickedElementAtribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(clickedElementAtribute);
  console.log('CorrectArticle:', correctArticle);

  /* [DONE] add class 'active' to the correct article */
  correctArticle.classList.add('active');
}


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList:', titleList);
  titleList.innerHTML = '';
  let html = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* find the title element and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle:', articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('afterbegin', linkHTML) && console.log('it works!');

    /* insert link into html variable */
    html = html + linkHTML;
    console.log('html:', html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  console.log('cystomSelector:', customSelector);
  console.log('optArticleSelector with customSelector:', optArticleSelector + customSelector);

}

generateTitleLinks();


function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    console.log('wrapper:', wrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray:', articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      console.log('tag:', tag);

      /* generate HTML of the link */
      const linkHTML = '<li>' + '<a href="#tag-' + tag +'">' + tag + '</a></li>';
      console.log('linkHTML:', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML + '\n';
      console.log('html:', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapper.insertAdjacentHTML('afterbegin', html);

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags'); //why not optTagsListSelector instead of .tags?

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}

generateTags();


function tagClickHandler(event){
  console.log(event);
  /* prevent default action for this event */
  event.preventDefault();
  console.log('prevent default');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href of clickedElement:', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('const tag:', tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeLinks:', activeLinks);

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
      /* remove class active */
      activeLink.classList.remove('active');
      console.log('class active removed');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksWithHrefOfClickedElement = document.querySelectorAll('a[href=href]');
  console.log('tagLinksWithHrefOfClickedElement:', tagLinksWithHrefOfClickedElement);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinksWithHrefOfClickedElement) {

    /* add class active */
    tagLink.classList.add('active');
    console.log('class active is added to', tagLink);

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('function generateTitleLinks is executed');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('tagLinks:', tagLinks);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {


    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find author wrapper */
    const wrapper = article.querySelector(optArticleAuthorSelector);
    console.log('wrapper:', wrapper);

    /* make html variable with empty string */
    let html = '';

    /* get author name from data-author attribute */
    const authorName = article.getAttribute('data-author');
    console.log('authorName:', authorName);

    /* generate HTML of the author-name */
    const authorNameHTML = '<a href="#author-' + authorName + '">' + '<span class="author-name">' + "by "+ authorName + '</span></a>';
    // const authorNameHTML = '<li>' + '<a href="#tag-' + tag +'">' + tag + '</a></li>';
    console.log('authorNameHTML:', authorNameHTML);

    /* add generated code to html variable */
    html = html + authorNameHTML + '\n';
    console.log('html:', html);

    /* add author name to wrapper */
    wrapper.innerHTML = html;
    console.log('wrapper:', wrapper);
  }
}

generateAuthors();


function authorClickHandler(event){
  console.log(event);
  /* prevent default action for this event */
  event.preventDefault();
  console.log('prevent default');

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href of clickedElement:', href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('const author:', author);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeAuthorLinks:', activeAuthorLinks);

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
      console.log('class active removed');

  /* END LOOP: for each active tag link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksWithHrefOfClickedElement = document.querySelectorAll('a[href=href]');
  console.log('authorLinksWithHrefOfClickedElement:', authorLinksWithHrefOfClickedElement);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinksWithHrefOfClickedElement) {

    /* add class active */
    authorLink.classList.add('active');
    console.log('class active is added to', authorLink);

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log('function generateTitleLinks is executed');
}

function addClickListenersToAuthors(){
  /* find all links to author*/
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log('authorLinks:', authorLinks);

  /* START LOOP: for each authorLink */
  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each authorLink */
  }
}

addClickListenersToAuthors();
