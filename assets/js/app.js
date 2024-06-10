document.addEventListener("DOMContentLoaded", function() {
    const forumForm = document.getElementById("forumForm");
    const userNameInput = document.getElementById("userName");
    const userTipTextarea = document.getElementById("userTip");
    const postsContainer = document.getElementById("postsContainer");

    // Función para cargar publicaciones desde el localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }

    // Función para guardar una publicación en el localStorage
    function savePost(post) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    // Función para crear un elemento de publicación
    function createPostElement(post) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postContent = `
            <h3>${post.name}</h3>
            <p>${post.tip}</p>
        `;

        postElement.innerHTML = postContent;
        return postElement;
    }

    // Evento de envío del formulario
    forumForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const userName = userNameInput.value.trim();
        const userTip = userTipTextarea.value.trim();

        if (userName && userTip) {
            const post = {
                name: userName,
                tip: userTip
            };

            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);

            savePost(post);

            forumForm.reset();
        }
    });

    // Cargar publicaciones al cargar la página
    loadPosts();
});
