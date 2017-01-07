const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'alan')
        done();
      });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'alan')
    assertName(joe.save(), done);
  });

  it('instance type using update', (done) => {
    assertName(joe.update({ name: 'alan' }), done);
  });

  it('model class using update', (done) => {
    assertName(
      User.update({ name: 'joe'}, { name: 'alan'}),
      done
    );
  });

  it('model class using findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'joe'}, { name: 'alan'}),
      done
    );
  });

  it('model class using findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'alan' }),
      done
    )
  });

  it('a user can have their likes incremented by 1', (done) => {
    User.update({ name: 'joe'}, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'joe'}))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
