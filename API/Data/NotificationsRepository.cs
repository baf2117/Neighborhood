namespace neighborhood
{
    using System;
    using System.Linq;

    class NotificationsRepository : IRepository<Notifications>
    {
        NeighborhoodContext _Context;
        public NotificationsRepository(NeighborhoodContext context)
        {
            _Context = context;
        }

        public Notifications GetById(Guid id)
        {
            return _Context.Notifications.Where(record => record.Id == id).FirstOrDefault();
        }

        public IQueryable<Notifications> Get()
        {
            return _Context.Notifications;
        }

        public void Insert(Notifications entity)
        {
            entity.Created = DateTime.Now;
            _Context.Add(entity);
            _Context.SaveChanges();
        }

        public void Update(Notifications entity)
        {
            _Context.Attach(entity);
            entity.LastUpdate = DateTime.Now;
            _Context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Notifications customer = this.GetById(id);
            _Context.Remove(customer);
            _Context.SaveChanges();
        }
    }
}