const URL = 'http://localhost:3333';

export const posts = async () => {
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: { authorization: `Bearer ${token}` },
  };

  const posts = await fetch(`${URL}/posts`, options);
  const res = await posts.json();
  return res;
};

export const addPost = async (title, content) => {
  if (!title || !content) return;

  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  };

  await fetch(`${URL}/posts/create`, options);
};

export const editPost = async (title, content, id) => {
  if (!title || !content || !id) return;

  const token = localStorage.getItem('token');
  const options = {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  };

  await fetch(`${URL}/posts/${id}`, options);
};

export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    await fetch(`${URL}/posts/${id}`, options);
  } catch (error) {
    console.log(error);
  }
};

export const postElement = (postData, user) => {
  const postContainer = document.createElement('div');
  postContainer.classList.add('post');
  postContainer.id = postData.id;

  const userContainer = document.createElement('div');
  userContainer.classList.add('post__userContainer');

  const userData = document.createElement('div');
  userData.classList.add('post__userData');

  const image = document.createElement('img');
  image.classList.add('post__userImg');
  image.src = postData.user.avatar;
  const username = document.createElement('p');
  username.classList.add('post__username');
  username.innerHTML = postData.user.username;
  const date = document.createElement('p');
  date.classList.add('post__date');
  date.innerHTML = formatDate(postData.createdAt);

  userData.append(image, username, date);

  userContainer.appendChild(userData);

  if (user.id === postData.user.id) {
    const userOptions = document.createElement('div');
    userOptions.classList.add('post__userOptions');

    const editPost = document.createElement('button');
    editPost.classList.add('post__edit');
    editPost.innerHTML = 'Editar';
    const deletePost = document.createElement('button');
    deletePost.classList.add('post__delete');
    deletePost.innerHTML = 'Excluir';

    userOptions.append(editPost, deletePost);

    userContainer.appendChild(userOptions);
  }

  const postTitle = document.createElement('h3');
  postTitle.classList.add('post__title');
  postTitle.innerHTML = postData.title;

  const postDescription = document.createElement('h3');
  postDescription.classList.add('post__description');
  postDescription.innerHTML = postData.content;

  const postView = document.createElement('button');
  postView.classList.add('post__viewBtn');
  postView.innerHTML = 'Acessar publicação';

  postContainer.append(userContainer, postTitle, postDescription, postView);

  return postContainer;
};

export const formatDate = (date) => {
  const dateFormat = new Date(date);

  return dateFormat.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
};
