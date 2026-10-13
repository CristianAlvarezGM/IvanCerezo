<%@page import="clinik.inicio.bll.PrincipalBLL"%>
<%@page import="clinik.agenda.bll.CitasBLL"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	Date date = new Date();
	long diff = date.getTime();
	PrincipalBLL oPrl = new PrincipalBLL();
	oPrl._InitPrincipal(session);
	String version = oPrl.getVersion();
	
	CitasBLL oCitas = new CitasBLL();
	oCitas._InitPrincipal(session, request);
	
%>
<!DOCTYPE html>
<html lang="en-US"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico">
    <title>Clinik - Dr. Hector Ruiz Leal</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> 
	<link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/all.css">
	<link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/v4-shims.css">
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-datetimepicker-4.17.47/build/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" type="text/css" href="assets/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="assets/plugins/intl-tel-input/css/intlTelInput.min.css">
    <link rel="stylesheet" type="text/css" href="css/clinik_styles.css">
    <link rel="stylesheet" type="text/css" href="assets/plugins/fullcalendar-5.2.0/lib/main.min.css">
    <link rel="stylesheet" type="text/css" href="assets/plugins/light-gallery/css/lightgallery.min.css">
    <link rel="stylesheet" type="text/css" href="assets/plugins/photobox/photobox.css">
    <link rel="stylesheet" type="text/css" href="assets/plugins/froala_editor_3.2.3/css/froala_editor.min.css">
    
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <style type="text/css">/* Chart.js */
	    <!--[if lt IE 9]>
			<script src="assets/js/html5shiv.min.js"></script>
			<script src="assets/js/respond.min.js"></script>
		<![endif]-->
		@-webkit-keyframes chartjs-render-animation{from{opacity:0.99}to{opacity:1}}@keyframes chartjs-render-animation{from{opacity:0.99}to{opacity:1}}.chartjs-render-monitor{-webkit-animation:chartjs-render-animation 0.001s;animation:chartjs-render-animation 0.001s;}
	</style>
</head>

<body>
<%
	if (oPrl.getCveUsr() != null) {	
%>
    <div class="main-wrapper">
        <div class="header">
			<div class="header-left">
				<a href="<%=request.getContextPath()%>" class="logo">
					<img src="assets/img/logo.png" width="35" height="35" alt=""> <span>Sistema Clinik</span>
				</a>
				<input type="hidden" name="grupo" value="<%=oPrl.getGrupoMedico()%>">
				<input type="hidden" id="idProfSalud" value="<%=oPrl.getiCveProfSalud()%>">
			</div>
			<a id="toggle_btn" href="javascript:void(0);"><i class="fa fa-bars"></i></a>
            <a id="mobile_btn" class="mobile_btn float-left" href="#sidebar"><i class="fa fa-bars"></i></a>
            <ul class="nav user-menu float-right">                
                <li class="nav-item dropdown has-arrow">
                    <a href="#" class="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                        <span class="user-img">
							<img class="rounded-circle" src="../upload/profesionales/PS<%=oPrl.getiCveProfSalud()%>.jpg?ver=<%=diff%>" width="24" alt="" onError="this.onerror=null;this.src='assets/img/user.jpg';">
							<span class="status online"></span>
						</span>
						<span><%=oPrl.getNomUsr() %></span>
                    </a>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="javascript:void(0);" role="menu" id="perfilMenu">Mi Perfil</a>
						<a class="dropdown-item" href="javascript:void(0);" role="oLnkAjax" id="editarPerfil">Editar Perfil</a>
						<!-- <a class="dropdown-item" href="javascript:void(0);">Configuraciones</a> -->
						<a class="dropdown-item" href="javascript:void(0);" role="oLnkAjax" data-param="cerrar=1&accion=die_session" id="endSession">Cerrar Sesión</a>
					</div>
                </li>
            </ul>
            <div class="dropdown mobile-user-menu float-right">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="javascript:void(0);" role="menu" id="perfilMenu">Mi Perfil</a>
                    <a class="dropdown-item" href="javascript:void(0);" role="oLnkAjax" id="editarPerfil">Editar Perfil</a>
                    <a class="dropdown-item" href="javascript:void(0);">Configuraciones</a>
                    <a class="dropdown-item" href="javascript:void(0);" role="menu" data-param="cerrar=1&accion=die_session" id="endSession">Cerrar Sesión</a>
                </div>
            </div>
        </div>
        <div class="sidebar" id="sidebar">
            <div class="slimScrollDiv">
            <div class="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">Menu Principal</li>
                        <% if(oPrl.getCategoria().equals("1008")) { %>
                        <li class="submenu">
                            <a href="#"><i class="fas fa-notes-medical"></i> <span> Consulta</span> <span class="menu-arrow"></span></a>
                            <ul style="display: none;">
                                <li><a href="javascript:void(0);" role="menu" id="consularCitaMenu">Pacientes con Cita</a></li>
                                <li><a href="javascript:void(0);" role="menu" id="consultarMenu">Consulta sin Cita</a></li>
                            </ul>
                        </li>
                        <% } %>
                        <li class="submenu">
                            <a href="#"><i class="fa fa-wheelchair"></i> <span>Pacientes</span> <span class="menu-arrow"></span></a>
                            <ul style="display: none;">
                            	<li><a href="javascript:void(0);" role="menu" id="pacientesMenu"><i class="fas fa-users"></i> <span>Lista de Pacientes</span></a></li>
							    <li><a href="javascript:void(0);" role="menu" id="pacientesEstudios"><i class="fas fa-users"></i> <span>Estudios</span></a></li>
							</ul>
                        </li>
                        <li>
                            <a href="javascript:void(0);" role="menu" id="citasMenu"><i class="fa fa-calendar"></i> <span>Citas</span></a>
                        </li>
                        <li class="submenu">
							<a href="#"><i class="fa fa-flag-o"></i> <span> Catálogos </span> <span class="menu-arrow"></span></a>
							<ul style="display: none;">
							    <li><a href="javascript:void(0);" role="menu" id="usuariosMenu"><i class="fas fa-users"></i> <span>Usuarios</span></a></li>
								<li><a href="javascript:void(0);" role="menu" id="diagsMenu"><i class="fas fa-diagnoses"></i> <span>Diagnósticos</span></a></li>
							</ul>
						</li>
						<% if(oPrl.getCategoria().equals("1008") || oPrl.getCategoria().equals("1010")) { %>
						<li class="submenu">
							<a href="#"><i class="fa fa-print"></i> <span> Reportes </span> <span class="menu-arrow"></span></a>
							<ul style="display: none;">
								<li><a href="javascript:void(0);" role="menu" id="ingresosRptMenu"> Reporte de Ingresos </a></li>
								<!-- <li><a href="javascript:void(0);" role="menu" id="consultasRptMenu"> Reporte de Consultas </a></li> -->
							</ul>
						</li>
						<% } %>
                        <li class="menu-title">Agenda </li>
                        <li>
                            <a href="javascript:void(0);" role="menu" id="calendarioMenu"><i class="fa fa-calendar"></i> <span>Calendario</span></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="slimScrollBar">
            </div>
        	</div>
        </div>
        <div class="page-wrapper" style="min-height: 1057px;">
            <div class="content" id="panelPrincipal">
            	<div class="title">
        			<h2>Información General</h2>
    			</div>
                <div class="row">
                	<div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div class="dash-widget">
                            <span class="dash-widget-bg2"><i class="fa fa-user-o"></i></span>
                            <div class="dash-widget-info text-right">
                                <h3><%=oPrl.getCuentaPacientes() %> </h3>
                                <span class="widget-title2">Pacientes <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div class="dash-widget">
                            <span class="dash-widget-bg3"><i class="fa fa-user-md" aria-hidden="true"></i></span>
                            <div class="dash-widget-info text-right">
                                <h3><%=oPrl.getAtendidos()%></h3>
                                <span class="widget-title3">Consultados <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div class="dash-widget">
                            <span class="dash-widget-bg4"><i class="fa fa-heartbeat" aria-hidden="true"></i></span>
                            <div class="dash-widget-info text-right">
                                <h3><%=oPrl.getPendientes() %></h3>
                                <span class="widget-title4">Citas Pendientes <i class="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
					<div class="col-12 col-md-12 col-lg-12 col-xl-12">
						<div class="card">
							<div class="card-header">
								<h4 class="card-title d-inline-block">Citas del Día</h4> <a href="javascript:void(0);" role="menu" id="citasBtn" class="btn btn-primary float-right">Ver todas</a>
							</div>
							<div class="card-body p-0">
								<div class="table-responsive">
									<%=oCitas.getTablaCitas() %>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
		<!-- Modal 1: xlModal -->
		<div id="xlModal" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
		  <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="xlModalLabel">Cobros</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-light" data-dismiss="modal">Cerrar</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- Modal 2: alert_modal -->
		<div id="alert_modal" class="modal fade delete-modal" tabindex="-1" role="dialog" aria-hidden="true">
		  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-body text-center">
		        <p><strong>Cargando...</strong></p>
		        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
		          <span class="sr-only">Cargando...</span>
		        </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- Modal 3: modal_ficha -->
		<div id="modal_ficha" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px;">
		    <div class="modal-content card-box p-3" id="ficha">
		      <!-- El contenido se inyecta dinámicamente -->
		    </div>
		  </div>
		</div>
		
		<!-- Modal 4: camara_modal -->
		<div id="camara_modal" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px;">
		    <div class="modal-content card-box p-3" id="camara">
		      <!-- El contenido se inyecta dinámicamente -->
		    </div>
		  </div>
		</div>
		
		<!-- Modal 5: modal_estudios -->
		<div id="modal_estudios" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 800px;">
		    <div class="modal-content card-box p-3" id="estudios">
		      <!-- El contenido se inyecta dinámicamente -->
		    </div>
		  </div>
		</div>
<%
	}else{
%>

		<div class="main-wrapper account-wrapper imgInicio">
        <div class="account-page">
			<div class="account-center">
				<div class="account-box">
                    <form action="login" class="form-signin" name="loginFrm" method="post" accept-charset="UTF-8">
						<div class="account-logo logo">
                            <a href="javascript:void(0);"><img src="assets/img/logo-dark.png" alt="">
                            	<span style="color: #0f458a!important;">Sistema Clinik</span>
                            </a>
                        </div>
                        <div class="form-group text-center" style="background: #0f458a;">
                        	<h3>Cirujano Oftalmólogo<br>Dr. Héctor Ruiz</h3>
                        </div>
                        <div class="form-group">
                            <label>Usuario</label>
                            <input type="text" autofocus="" class="form-control" name="usuario">
                        </div>
                        <div class="form-group">
                            <label>Contraseña</label>
                            <input type="password" class="form-control" name="password">
                        </div>
                        <div class="form-group text-right">
                            <a href="forgot-password.html">Olvidó su password?</a>
                        </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary account-btn">Login</button>
                        </div>
                    </form>
                </div>
			</div>
        </div>
    </div>   
    
   <script>
	   $(document).ready(function () {
		    $('input[name="usuario"], input[name="password"]').on('keydown', function (e) {
		        if (e.key === 'Enter') {
		            e.preventDefault();
		            $('.account-btn').click();
		        }
		    });
		});
	</script>	
<%	
	}
%>    
    <div class="sidebar-overlay" data-reff=""></div>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/plugins/bootstrap-4.5.2/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.slimscroll.js"></script>
    <script src="assets/js/Chart.bundle.js"></script>
	<script src="assets/js/jquery.slimscroll.js"></script>
	<script src="assets/js/jquery.dataTables.min.js"></script>
	<script src="assets/js/dataTables.bootstrap4.min.js"></script>
	<script src="assets/js/select2.min.js"></script>
	<script src="assets/js/moment.min.js"></script>
	<script src="assets/plugins/intl-tel-input/js/intlTelInput.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/es.js"></script>
	<script src="assets/plugins/bootstrap-datetimepicker-4.17.47/build/js/bootstrap-datetimepicker.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/email-autocomplete/0.1.3/jquery.email-autocomplete.min.js"></script>
    <script src="assets/plugins/fontawesome/js/all.js" defer></script>
    <script src="assets/plugins/fontawesome/js/v4-shims.js" defer></script>
    <script src="https://cdn.datatables.net/plug-ins/1.10.13/features/mark.js/datatables.mark.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/mark.js/8.6.0/jquery.mark.min.js" type="text/javascript"></script>
    <script src="assets/plugins/fullcalendar-5.2.0/lib/main.min.js" type="text/javascript"></script>
    <script src="assets/plugins/fullcalendar-5.2.0/lib/locales-all.min.js" type="text/javascript"></script>
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/app.js?ver=<%=version%>>" type="text/javascript"></script>
    <script src="js/clinik_general.js?ver=<%=version%>" type="text/javascript"></script>
    <script src="js/clinik_funciones.js?ver=<%=version%>" type="text/javascript"></script>
    	<!-- SmtpJs Email Plugin -->
	<script src="assets/js/smtp.js"></script>
	<script src="assets/plugins/ics/Blob.js"></script>
	<script src="assets/plugins/ics/FileSaver.js"></script>
	<script src="assets/plugins/ics/ics.js"></script>
	<script src="assets/plugins/light-gallery/js/lightgallery-all.min.js"></script>
	<script src='assets/plugins/photobox/jquery.photobox.js'></script>
	<script src='assets/plugins/froala_editor_3.2.3/js/froala_editor.min.js'></script>
	<script src='assets/plugins/froala_editor_3.2.3/js/plugins/font_family.min.js'></script>
	<script src='assets/plugins/froala_editor_3.2.3/js/plugins/font_size.min.js'></script>
	<script src='assets/plugins/froala_editor_3.2.3/js/plugins/align.min.js'></script>
</body>
</html>