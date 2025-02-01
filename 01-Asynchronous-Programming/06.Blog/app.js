// function attachEvents() {
//     const postsURL = 'http://localhost:3030/jsonstore/blog/posts';
//     const viewURL = `http://localhost:3030/jsonstore/blog/comments/`;

//     //Select all DOM elements
//     const loadPostsBtn = document.getElementById('btnLoadPosts');
//     const postsSelect = document.getElementById('posts');
//     const viewPostsBtn = document.getElementById('btnViewPost');
//     const postTitle = document.getElementById('post-title');
//     const postContent = document.getElementById('post-body');
//     const postComentsUl = document.getElementById('post-comments');

//     //Add event lesteners
//     loadPostsBtn.addEventListener('click', loadPosts);
//     viewPostsBtn.addEventListener('click', viewPosts);

//     let commandData;

//     function loadPosts() {
//         //Get posts
//         fetch(postsURL)
//             .then(res => res.json())
//             .then(data => addPost(data));

//         function addPost(data) {
//             commandData = data;

//             postsSelect.innerHTML = '';

//             // console.log(data);
//             for (const [id, info] of Object.entries(data)) {
//                 // console.log(id);

//                 const option = document.createElement('option');
//                 option.value = id;
//                 option.textContent = info.title;
//                 postsSelect.appendChild(option);
//             }
//         }
//     }

//     function viewPosts() {
//         //Get post ID
//         const selectedPostID = document.getElementById('posts').value;
//         postTitle.textContent = commandData[selectedPostID].title;
//         postContent.textContent = commandData[selectedPostID].body;

//         fetch(viewURL)
//             .then(res => res.json())
//             .then(data => showComments(data));

//         function showComments(data) {
//             postComentsUl.innerHTML = '';
//             console.log(data);
//             console.log(commandData);
//             console.log(Object.values(data));
//             const comments = Object.values(data).filter(value => value.postId === commandData[value.postId].id);
            
//             console.log(comments);
            
//             comments.forEach(c => {
//                 const li = document.createElement('li');
//                 li.id = c.id;
//                 li.textContent = c.text;
//                 postComentsUl.appendChild(li);
//             });
//             // for (const [id, info] of Object.entries(data)) {
//             //     console.log(info.postId);
//             //     console.log(`----`);
                
//             //     if (info.postId === commandData[info.postId].id) {
//             //         console.log(commandData[info.postId].id);
//             //         console.log(`-----`);
                    
                   
//             //     }
//             // }

//         }

//     }

// }


function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

const posts = [];

async function loadPosts() {
    try {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        document.getElementById('posts').innerHTML = '';

        Object.entries(data).forEach(([key, value]) => {
            const optionElement = document.createElement('option');
            optionElement.value = key; // Here we lock the element 'id'.
            optionElement.textContent = value.title;
            document.getElementById('posts').appendChild(optionElement);
            posts.push({ title: value.title, body: value.body });
        });

    } catch (error) {
        console.log(error);
    }
}

async function viewPost() {
    try {
        const selectedElement = document.getElementById('posts');
        const url = 'http://localhost:3030/jsonstore/blog/comments';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        const comments = Object.values(data).filter(el => el.postId === selectedElement.value);
        document.getElementById('post-title').textContent = selectedElement.selectedOptions[0].textContent;
        console.log(selectedElement);
        
        // ^ With 'selectedOptions' we take the current selected option from the drop-down menu.

        const po = posts.filter(p => p.title === selectedElement.selectedOptions[0].textContent);
        // ^ This return an array with needed element.
        document.getElementById('post-body').innerHTML = `${po[0].body}`;

        document.getElementById('post-comments').innerHTML = '';

        comments.forEach(el => {
            const liElement = document.createElement('li');
            liElement.textContent = el.text;
            document.getElementById('post-comments').appendChild(liElement);
        });

    } catch (error) {
        console.log(error);
    }
}
attachEvents();