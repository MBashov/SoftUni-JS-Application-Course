const postURL = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsURL = 'http://localhost:3030/jsonstore/collections/myboard/comments';

document.querySelector('body header a').addEventListener('click', () => {
    document.querySelectorAll('.container')[0].style.display = 'block';
    document.querySelectorAll('.container')[1].style.display = 'none';
});

const commentSection = document.querySelectorAll('.container')[1];
commentSection.style.display = 'none'; // New added!

document.querySelector('.cancel').addEventListener('click', (e) => {
    e.preventDefault();
    topicNameEl.value = '';
    usernameEl.value = '';
    postTextEl.value = '';
});

const topicNameEl = document.getElementById('topicName');
const usernameEl = document.getElementById('username');
const postTextEl = document.getElementById('postText');


const postBtn = document.querySelector('.public');

postBtn.addEventListener('click', createPost);

const homeNavEl = document.querySelector('nav a');
homeNavEl.addEventListener('click', homePage);

const topicTitle = document.querySelector('.topic-title');

async function createPost(e) {
    e.preventDefault();

    let date = new Date();
    date = date.toISOString();

    const newPost = {
        'Title': topicNameEl.value,
        'Username': usernameEl.value,
        'Post': postTextEl.value,
        'date': date,
        'id': `${topicNameEl.value}-${usernameEl.value}`
    }

    if (!topicNameEl.value || !usernameEl.value || !postTextEl.value) {
        alert('All fields must be filled');
        return;
    }

    await fetch(postURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(newPost)
    });

    topicNameEl.value = '';
    usernameEl.value = '';
    postTextEl.value = '';
}

async function homePage(e) {

    const response = await fetch(postURL);
    const data = await response.json();
    // console.log(data);

    topicTitle.innerHTML = '';

    Object.values(data).forEach(topic => {

        const h2 = createEl('h2', topic.Title);
        const a = createEl('a', '', ['href', '#', 'class', 'normal', 'id', topic._id]);
        a.appendChild(h2);

        const topicName = createEl('div', '', ['class', 'topic-name']);

        const wrapper = createEl('div', '', ['class', 'topic-name-wrapper']);

        const container = createEl('div', '', ['class', 'topic-container']);
        container.appendChild(wrapper);


        const span = createEl('span', topic.Username)
        const pUsername = createEl('p', 'Username: ')
        pUsername.appendChild(span);

        const nickName = createEl('div', '', ['class', 'nick-name']);
        nickName.appendChild(pUsername);

        const pdate = createEl('p', 'date: ');
        const time = createEl('time', topic.date);
        pdate.appendChild(time);

        const div = createEl('div');
        div.appendChild(pdate);
        div.appendChild(nickName);

        const columns = createEl('div', '', ['class', 'columns']);
        columns.appendChild(div);

        topicName.appendChild(a);
        topicName.appendChild(columns);

        wrapper.appendChild(topicName);

        topicTitle.appendChild(container);

    });

    const comentsTitles = document.querySelectorAll('a.normal');
    comentsTitles.forEach(comentsTitle => comentsTitle.addEventListener('click', showTopicDetails));
}

async function showTopicDetails(e) {

    commentSection.style.display = 'block';
    document.querySelectorAll('.container')[0].style.display = 'none';
    commentSection.querySelector('button').addEventListener('click', loadComents)
    const id = e.target.parentElement.id;
    // console.log(id);

    const response = await fetch(postURL);
    const data = await response.json();

    // console.log(data);
    Object.values(data).forEach(post => {
        if (post._id === id) {
            console.log(post);
            
            commentSection.querySelector('h2').textContent = post.Title;
            const divComments = commentSection.querySelector('.comment');

            const divHeader = createEl('div', '', ['class', 'header']);

            const img = createEl('img', '', ['src', './static/profile.png', 'alt', 'avatar']);
            const p = createEl('p');
            p.innerHTML = `<span>${post.Username}</span> posted on <time>${post.date}</time>`;
            // const span = createEl('span', post.Username);
            // p.appendChild(span);
            // p.textContent = 'posted on ';
            // const time = createEl('time', post.date);
            // p.appendChild(time);

            divHeader.appendChild(img);
            divHeader.appendChild(p);

            const pContent = createEl('p', post.Post, ['class', 'post-content']);
            divHeader.appendChild(pContent);

            divComments.appendChild(divHeader);

            // const divAnswerComment = document.querySelector('.answer-comment');

            fetch(commentsURL)
                .then(res => res.json())
                .then(comments => {
                    console.log(comments);
                    
                    Object.values(comments).forEach(comment => {
                        console.log(comment);
                        
                        const divUserComment = createEl('div', '', ['id', 'user-comment']);

                        const divWrapper = createEl('div', '', ['class', 'topic-name-wrapper']);

                        const divTopicName = createEl('div', '', ['class', 'topic-name']);
                        
                        const p = createEl('p');
                        p.innerHTML = `<strong>${comment.username}</strong> posted on <time>${comment.date}</time>`;
                        // const strong = createEl('strong', comment.username);
                        // p.appendChild(strong);
                        // p.textContent = 'commented on ';
                        // const time = createEl('time', post.date);
                        // p.appendChild(time);
                        
                        divTopicName.appendChild(p);
                        
                        const divPostContent = createEl('div', '', ['class', 'topic-content']);

                        const pContent = createEl('p', comment.comment);
                        divPostContent.appendChild(pContent);

                        divTopicName.appendChild(pContent);

                        divWrapper.appendChild(divTopicName);
                        divUserComment.appendChild(divWrapper);
                        divComments.appendChild(divUserComment);
                    });
                });
            // console.log(coments);

        }
    });
}

async function loadComents(e) {
    e.preventDefault();
    // console.log(e.target.parentElement);

    const textAreaEl = e.target.parentElement.querySelector('textarea');
    const usernameEl = e.target.parentElement.querySelector('#username');

    if (textAreaEl.value !== '' && usernameEl.value !== '') {
        let date = new date();
        date = date.toISOString();

        const response = await fetch(commentsURL, {
            method: 'POST',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify({
                comment: textAreaEl.value,
                username: usernameEl.value,
                date: date
            })
        });
        const data = response.json();

        // console.log(data); // To do get request to commentsURL...

    }


    textAreaEl.value = '';
    usernameEl.value = '';

}

function createEl(type, content, attributes = []) {
    const element = document.createElement(type);
    if (content) {
        element.textContent = content
    }
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}
