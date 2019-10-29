module.exports = {

  findMyBolog: function (req, res) {

    sails.log.info('start to find user blog ');
    /*
    var userId = req.session.userId;
    const page = req.param('page')
    const amountOfProducts = await Blog
      .count()
      .where({ writer: userId })
      .catch(error => res.serverError(error))


    var myBlog = await Blog.find({
      where: { writer: userId, occupation: { contains: 'writer' } },
      skip: page * 10,
      limit: 10,
      sort: [{ updatedAt: 'DESC' }]
    });

    return res.json({
      myBlog,
      amountOfProducts
    });*/
  },
  addBlog: function (req, res) {
    sails.log.info('start to save  blog ');
    var blog = req.body;
    // const products = req.param('products')
    /*
    if (blog.id) {
      //update 
      sails.log.info('update  blog ' + blog.id);
      Blog.update({ id: blog.id }, log, function (err, record) {
        if (err) {
          sails.log.info('update error');
          return res.json(40001, { msg: 'update error' })
        } else {
          return res.json(0, blog)
        }

      });
    } else {*/
    //create
    sails.log.info('save  blog ');
    /*try {
      var blog = await Blog.create(blog).fetch();
      return res.json(0, blog)
    } catch (error) {
      sails.log.info('create error' + err.code);
      sails.log.info('create error' + err.stack);
      // return res.json(40001, { msg: 'create error' })
      return res.status(500).json({ msg: 'create error' });
    }*/

    Blog.create(blog).exec(function (err, record) {
      if (err) {
        sails.log.info('create error' + err.CODE);
        // return res.json(40001, { msg: 'create error' })
        return res.status(500).json({ msg: 'create error' });
      } else {
        return res.status(200).json(blog)
      }
    });

    //}
    // var opt = param || { name: 'zzl' };


  },
  findById: function (req, res) {
    /*
    var blogid = req.query.id;
    sails.log.info('start to find  blog by id:' + blogid);
    var blog = await Blog.findOne({
      id: blogid
    });

    if (!blog) {
      sails.log('Could not find Blog, sorry.');
      return res.json(40001, { msg: 'find by id  error' })
    } else {
      sails.log('Found "%s"', blog.title);
      return res.json(0, blog)
    }*/

  },

  delete: function (req, res) {
    /*
        var blogid = req.query.id;
        sails.log.info('start to delete  blog by id:' + blogid);
        Blog.destroy({ id: blogid }).exec(function (err) {
          if (err) {
            sails.log.info("delete err" + err);
            return res.json(40001, { msg: 'delete error' })
          } else {
            sails.log.info("delete success id:" + blogid);
            return res.json(0, { msg: 'delete success ' })
          }
    
        })*/

  }

};