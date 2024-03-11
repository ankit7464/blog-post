document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blog-form');
    const blogPosts = document.getElementById('blog-posts');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = form.title.value;
        const content = form.content.value;
        addBlogPost(title, content);
        saveBlogPost(title, content); // Save post to backend
        form.reset();
        // Smooth scroll to top to see the newly added post
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function addBlogPost(title, content) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        const contentElement = document.createElement('p');
        contentElement.textContent = content;
        postDiv.appendChild(titleElement);
        postDiv.appendChild(contentElement);
        blogPosts.prepend(postDiv); // Adds the new post at the top
    }

    function saveBlogPost(title, content) {
        // Make an AJAX request to save the blog post to the backend
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/blogPosts', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 201) {
                console.log('Blog post saved successfully');
            } else {
                console.error('Error saving blog post:', xhr.responseText);
            }
        };
        xhr.onerror = function() {
            console.error('Error saving blog post');
        };
        const postData = JSON.stringify({ title: title, content: content });
        xhr.send(postData);
    }
});
