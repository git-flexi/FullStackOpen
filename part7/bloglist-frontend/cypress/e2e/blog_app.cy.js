describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = { name: 'Flexi', username: 'Flexi', password: 'flexi' };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    const user2 = { name: 'Patrick', username: 'Patrick', password: 'patrick' };
    cy.request('POST', 'http://localhost:3003/api/users/', user2);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in');
  });

  describe('Logging in', function () {
    it('User can login', function () {
      cy.contains('log in').click();
      cy.get('#username').type('Flexi');
      cy.get('#password').type('flexi');
      cy.get('#login-button').click();

      cy.contains('Flexi logged in');
    });

    it('User uses wrong password', function () {
      cy.contains('log in').click();
      cy.get('#username').type('Flexi');
      cy.get('#password').type('flax');
      cy.get('#login-button').click();

      cy.get('.message').should('contain', 'invalid username or password');
      cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('.message').should('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', '/api/login', {
        username: 'Flexi',
        password: 'flexi',
      }).then((response) => {
        localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.body)
        );
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('New Blog');
      cy.get('#author').type('Flexifailix');
      cy.get('#url').type('www.newblog.com');
      cy.contains('create').click();

      cy.get('.message').should(
        'contain',
        'A new Blog New Blog by Flexifailix added'
      );
      cy.get('.blog').should('contain', 'New Blog by Flexifailix');
    });

    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog1',
          author: 'Author1',
          url: 'www.randomUrl1.com',
        });
        cy.createBlog({
          title: 'Blog2',
          author: 'Author2',
          url: 'www.randomUrl2.com',
        });
        cy.createBlog({
          title: 'Blog3',
          author: 'Author3',
          url: 'www.randomUrl3.com',
        });
      });

      it('A blog can be liked', function () {
        cy.get('.blog').contains('Blog2').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('Likes: 0');
        cy.get('@theBlog').contains('like').click();
        cy.get('@theBlog').contains('Likes: 1');
      });

      it('A blog can be deleted by creator', function () {
        cy.createBlog({
          title: 'Deletionblog',
          author: 'Author4',
          url: 'www.randomUrl4.com',
        });

        cy.get('.blog').contains('Deletionblog').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('delete').click();

        cy.get('.blog').contains('Deletionblog').should('not.exist');
      });

      it('A blog can not be deleted by others', function () {
        cy.createBlog({
          title: 'Deletionblog',
          author: 'Author4',
          url: 'www.randomUrl4.com',
        });

        cy.request('POST', '/api/login', {
          username: 'Patrick',
          password: 'patrick',
        }).then((response) => {
          localStorage.setItem(
            'loggedBlogappUser',
            JSON.stringify(response.body)
          );
          cy.visit('http://localhost:3000');
        });

        cy.get('.blog').contains('Deletionblog').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('delete').should('not.exist');
      });

      it('The order is changed with the amount of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Blog1');
        cy.get('.blog').eq(1).should('contain', 'Blog2');
        cy.get('.blog').eq(2).should('contain', 'Blog3');

        cy.get('.blog').contains('Blog3').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();
        cy.get('@theBlog').contains('like').click();

        cy.get('.blog').contains('Blog2').parent().as('theBlog');
        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();

        cy.get('.blog').eq(0).should('contain', 'Blog3');
        cy.get('.blog').eq(1).should('contain', 'Blog2');
        cy.get('.blog').eq(2).should('contain', 'Blog1');
      });
    });
  });
});
