# Neuron (beta)

Use For Yourself! At : [Neuron](https://neuronnotes.onrender.com)

Neuron is a full-stack knowledge management system built with Django REST Framework and React.

It allows users to create structured project-based vaults with nested folders, markdown notes, and controlled access (public/private).

---

## Features

- JWT-based authentication
- Public and private projects
- Follow / unfollow public projects
- Nested folder hierarchy (self-referential structure)
- Markdown notes
- Project-level access control
- RESTful API architecture

---

## Tech Stack

**Backend**

- Django
- Django REST Framework
- Custom JWT authentication
- Relational data modeling

**Frontend**

- React
- State-driven conditional rendering
- MUI for UI components

---

## Permission Model

- Owners: full access
- Followers: view-only
- Public users: view-only (public projects)

Access control is enforced at the project level.

## More Features Coming Soon....

1. Deep copy a project
2. Graph view of your notes
3. much more....
