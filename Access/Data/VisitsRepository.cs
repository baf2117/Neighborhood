namespace neighborhood
{
    using System;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    class VisitsRepository : IRepository<Visits>
    {
        NeighborhoodContext _Context;
        public VisitsRepository(NeighborhoodContext context)
        {
            _Context = context;
        }

        public Visits GetById(Guid id)
        {
            return _Context.Visits.Where(record => record.Id == id).Include(r => r.Profile).FirstOrDefault();
        }

        public IQueryable<Visits> Get()
        {
            return _Context.Visits;
        }

        public void Insert(Visits entity)
        {
            entity.Created = DateTime.Now;
            _Context.Add(entity);
            _Context.SaveChanges();
        }

        public void Update(Visits entity)
        {
            _Context.Attach(entity);
            entity.LastUpdate = DateTime.Now;
            _Context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Visits customer = this.GetById(id);
            _Context.Remove(customer);
            _Context.SaveChanges();
        }
    }
}