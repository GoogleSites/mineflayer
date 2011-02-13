
// find a human player
mf.onEntitySpawned(function handleEntitySpawned(entity) {
    if (entity.type !== mf.EntityType.Player) {
        // not a human player
        return;
    }
    // found a human player
    var target_entity_id = entity.entity_id;
    var message = "i'm following " + entity.username + " " + target_entity_id;
    mf.chat(message);
    mf.debug(message);

    // detach this handler so we don't try to follow anyone else
    mf.removeHandler(mf.onEntitySpawned, handleEntitySpawned);
    // add a handler to watch this guy moving around
    mf.onEntityMoved(function(entity) {
        if (entity.entity_id !== target_entity_id) {
            // this isn't our target
            return;
        }
        // face the target
        mf.lookAt(entity.position);
        // move forward constantly
        mf.setControlState(mf.Control.Forward, true);
    });
    mf.onEntityDespawned(function(entity) {
        if (entity.entity_id === target_entity_id) {
            mf.chat("well, i'm outta here");
            mf.exit();
        }
    });
});
