abstract class BaseMapper<Entity, Model> {
    abstract entityToModel(entity: Entity): Model;
    abstract modelToEntity(model: Model): Entity;
}

export default BaseMapper;
