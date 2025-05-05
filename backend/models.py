from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('admin', 'driver', 'parent', name='user_roles'), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)


class Driver(db.Model):
    __tablename__ = 'drivers'
    driver_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    license_number = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    user = db.relationship('User', backref=db.backref('driver', uselist=False))


class Student(db.Model):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    grade = db.Column(db.String(10), nullable=False)
    address = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    special_needs = db.Column(db.Boolean, default=False)
    guardian_phone = db.Column(db.String(20), nullable=False)


class BusStop(db.Model):
    __tablename__ = 'bus_stops'
    stop_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    is_active = db.Column(db.Boolean, default=True)


class StudentStopAssignment(db.Model):
    __tablename__ = 'student_stop_assignments'
    assignment_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.student_id'), nullable=False)
    stop_id = db.Column(db.Integer, db.ForeignKey('bus_stops.stop_id'), nullable=False)
    walking_distance = db.Column(db.Float, nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    student = db.relationship('Student', backref=db.backref('stop_assignments', lazy=True))
    stop = db.relationship('BusStop', backref=db.backref('student_assignments', lazy=True))


class Bus(db.Model):
    __tablename__ = 'buses'
    bus_id = db.Column(db.Integer, primary_key=True)
    vehicle_number = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    wheelchair_accessible = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), nullable=False)


class Route(db.Model):
    __tablename__ = 'routes'
    route_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    direction = db.Column(db.Enum('to_school', 'from_school', name='route_direction'), nullable=False)
    is_active = db.Column(db.Boolean, default=True)


class RouteStop(db.Model):
    __tablename__ = 'route_stops'
    route_stop_id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.route_id'), nullable=False)
    stop_id = db.Column(db.Integer, db.ForeignKey('bus_stops.stop_id'), nullable=False)
    sequence_number = db.Column(db.Integer, nullable=False)
    scheduled_arrival_time = db.Column(db.Time, nullable=False)

    route = db.relationship('Route', backref=db.backref('route_stops', lazy=True))
    stop = db.relationship('BusStop', backref=db.backref('route_stops', lazy=True))


class RouteAssignment(db.Model):
    __tablename__ = 'route_assignments'
    assignment_id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.route_id'), nullable=False)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.bus_id'), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.driver_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('scheduled', 'in_progress', 'completed', name='assignment_status'), nullable=False)

    route = db.relationship('Route', backref=db.backref('assignments', lazy=True))
    bus = db.relationship('Bus', backref=db.backref('assignments', lazy=True))
    driver = db.relationship('Driver', backref=db.backref('assignments', lazy=True))


class TravelTime(db.Model):
    __tablename__ = 'travel_times'
    travel_time_id = db.Column(db.Integer, primary_key=True)
    from_stop_id = db.Column(db.Integer, db.ForeignKey('bus_stops.stop_id'), nullable=False)
    to_stop_id = db.Column(db.Integer, db.ForeignKey('bus_stops.stop_id'), nullable=False)
    time_of_day = db.Column(db.Enum('morning', 'afternoon', name='time_of_day'), nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    last_updated = db.Column(db.DateTime, nullable=False)

    from_stop = db.relationship('BusStop', foreign_keys=[from_stop_id])
    to_stop = db.relationship('BusStop', foreign_keys=[to_stop_id])
