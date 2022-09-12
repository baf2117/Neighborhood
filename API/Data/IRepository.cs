namespace neighborhood
{
    using System;
    using System.Linq;

    interface IRepository<T> where T : Entity
    {
        IQueryable<T> Get();
        T GetById(Guid id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(Guid id);
    }
}