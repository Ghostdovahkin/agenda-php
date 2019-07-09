<div class="campos">
    <div class="campo">
<label for="nombre">Nombre:</label>
<input type="text" 
    placeholder="nombre de contacto" 
    id="nombre" 
    value= "<?php if(isset($contacto["nombre"])) echo $contacto["nombre"]; else echo ""  ?>">
    
    </div>
    
    <div class="campo">
<label for="empresa">Empresa:</label>
<input type="text" 
        placeholder="nombre de Empresa" 
        id="empresa"
        value= "<?php if(isset($contacto["empresa"])) echo $contacto["empresa"]; else echo ""  ?>">
        
    </div>
    <div class="campo">
<label for="telefono">Telefono:</label>
<input type="tel" 
        placeholder="numero de telefono" 
        id="telefono"
        value= "<?php if(isset($contacto["telefono"])) echo $contacto["telefono"]; else echo ""  ?>">
    </div> 
    </div>
<div class="campo enviar">
   <?php
   $textoBtn = ($contacto['telefono']) ? 'guardar' : 'añadir';
   $accion = ($contacto['telefono']) ? 'editar' : 'crear';
   ?>
   <input type="hidden" id="accion" value="<?php echo $accion; ?>">
   <?php if( isset( $contacto ['id'] )) { ?>
        <input type="hidden" id="id" value="<?php echo $contacto ['id']; ?>">
   <?php } ?>
   <input type="submit" value="<?php echo $textoBtn; ?>">
    </div>
 