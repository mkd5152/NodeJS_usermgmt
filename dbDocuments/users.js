const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");


mongoose.plugin(schema => { schema.options.usePushEach = true });

//save new somethings
var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    requierd: true,
    unique: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not valid`
    }
  },
  password: {
    type: String,
    requierd: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    default: 'user' //we have 2 types of user {admin and user}
  },
  tokens: [
    {
      access: {
        type: String,
        requierd: true
      },
      token: {
        type: String,
        requierd: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', "firstName", "lastName", "email", "role"]);
};

UserSchema.methods.generateAuthToken = function () {
  var _this = this;
  var access = "token";
  var token = jwt
    .sign(
      {
        _id: _this._id.toHexString(),
        access
      },
      "mkd5152"
    )
    .toString();
  _this.tokens.push({ access, token });
  return _this.save().then(() => {
    return token;
  });
};


UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "mkd5152");
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "token"
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre("save", function (next) {
  var _this = this;
  if (_this.isModified("password")) {
    bcrypt.genSalt(
      (10, (err, salt) => {
        bcrypt.hash(_this.password, salt, (err, hash) => {
          _this.password = hash;
          next();
        });
      })
    );
  } else {
    next();
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = { User };
