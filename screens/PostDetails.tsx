import React from 'react';

function PostDetail() {
  const posts = [
    {
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
      name: 'Paula Leal',
      timestamp: '2023-05-02T10:00:00Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://picsum.photos/400/400',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
      }}
    >
      {posts.map((post, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            maxWidth: 600,
            marginBottom: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={post.avatar}
              alt="avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginRight: 10,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold' }}>{post.name}</span>
              <span style={{ fontSize: 12, color: '#888' }}>
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
          <p style={{ marginTop: 10 }}>{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt="post"
              style={{ width: '100%', marginTop: 10 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
