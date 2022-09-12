namespace neighborhood
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using System.Linq;

    class ProfileRepository : IRepository<Profile>
    {
        NeighborhoodContext _Context;
        public ProfileRepository(NeighborhoodContext context)
        {
            _Context = context;
        }

        public Profile GetById(Guid id)
        {
            if (id == Guid.Empty)
                return null;
            return _Context.Profiles.Where(record => record.Id == id).FirstOrDefault();
        }

        public IQueryable<Profile> Get()
        {
            return _Context.Profiles;
        }

        public void Insert(Profile entity)
        {
            entity.Created = DateTime.Now;
            _Context.Add(entity);
            _Context.SaveChanges();
        }

        public void Update(Profile entity)
        {
            _Context.Attach(entity);
            entity.LastUpdate = DateTime.Now;
            _Context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Profile customer = this.GetById(id);
            _Context.Remove(customer);
            _Context.SaveChanges();
        }
    }
}