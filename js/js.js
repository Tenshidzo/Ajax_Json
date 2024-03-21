const copywritersList = document.getElementById('copywriters-list');
            const copywriterDetails = document.getElementById('copywriter-details');

            function fetchCopywriters() {
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(user => {
                            const li = document.createElement('li');
                            li.textContent = user.name;
                            li.setAttribute('data-user-id', user.id);
                            li.addEventListener('click', () => showCopywriterDetails(user.id));
                            copywritersList.appendChild(li);
                        });
                    })
                    .catch(error => console.error('Error fetching copywriters:', error));
            }

            function showCopywriterDetails(userId) {
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                    .then(response => response.json())
                    .then(user => {
                        copywriterDetails.innerHTML = `
                            <table>
                                <tr><th>Name</th><td>${user.name}</td></tr>
                                <tr><th>Username</th><td>${user.username}</td></tr>
                                <tr><th>Email</th><td>${user.email}</td></tr>
                                <tr><th>Phone</th><td>${user.phone}</td></tr>
                                <tr><th>Address</th><td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td></tr>
                                <tr><th>Website</th><td>${user.website}</td></tr>
                            </table>
                            <button id="show-posts-btn">Show Posts</button>
                        `;
                        const showPostsBtn = document.getElementById('show-posts-btn');
                        showPostsBtn.style.marginTop = '10px';
                        showPostsBtn.style.padding = '5px 10px';
                        showPostsBtn.style.backgroundColor = '#007bff';
                        showPostsBtn.style.color = 'white';
                        showPostsBtn.style.border = '1px';
                        showPostsBtn.style.borderRadius = '5px';
                        showPostsBtn.addEventListener('click', () => showCopywriterPosts(userId));
                    })
                    .catch(error => console.error('Error fetching copywriter details:', error));
            }

            window.showCopywriterPosts = function(userId) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then(response => response.json())
                    .then(posts => {
                        const postsList = posts.map(post => `<li>${post.title}</li>`).join('');
                        copywriterDetails.innerHTML += `<h3>Posts:</h3><ul>${postsList}</ul>`;
                    })
                    .catch(error => console.error('Error fetching copywriter posts:', error));
            };

            fetchCopywriters();